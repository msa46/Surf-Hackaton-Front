// src/qkd-client/QKD014Client.ts

interface StatusResponse {
    status: string;
    message: string;
}

interface KeyResponse {
    keyId: string;
    keyData: string;
}

export interface QKDConfig {
    certPath: string;
    keyPath: string;
    caPath?: string;
    timeout?: number;
}

export class QKD014Client {
    private baseUrl: string;
    private config: QKDConfig;
    private cert: string | null = null;
    private key: string | null = null;

    constructor(baseUrl: string, config: QKDConfig) {
        this.baseUrl = baseUrl;
        this.config = {
            timeout: 10000,
            ...config
        };

        

 
    }

    private async loadCertificates() {
        try {
            // Load certificates if not already loaded
            if (!this.cert || !this.key) {
                const [certResponse, keyResponse] = await Promise.all([
                    fetch(this.config.certPath),
                    fetch(this.config.keyPath)
                ]);

                this.cert = await certResponse.text();
                this.key = await keyResponse.text();


            }
        } catch (error) {
            throw new Error(`Failed to load certificates: ${error}`);
        }
    }

    private async makeRequest<T>(
        method: string,
        path: string,
        body?: any
    ): Promise<T> {

        await this.loadCertificates();

        if (!this.cert || !this.key) {
            throw new Error('Certificates not loaded');
        }
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        try {
            // Create credentials object
            const headers = new Headers({
                'Content-Type': 'application/json',
                'X-Client-Cert': btoa(this.cert),
                'X-Client-Key': btoa(this.key),
            });


            const response = await fetch(`${this.baseUrl}${path}`, {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal,
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} - ${await response.text()}`);
            }

            return response.json();
        } finally {
            clearTimeout(timeoutId);
        }
    }





    async getStatus(): Promise<StatusResponse> {
        return this.makeRequest<StatusResponse>('GET', '/api/v1/status');
    }

    async getKey(
        keySize: number,
        masterSaeId: string,
        slaveSaeId: string,
        keyCount: number = 1
    ): Promise<KeyResponse[]> {
        const body = {
            key_size: keySize,
            master_SAE_ID: masterSaeId,
            slave_SAE_ID: slaveSaeId,
            key_count: keyCount,
        };
        return this.makeRequest<KeyResponse[]>('POST', '/api/v1/keys', body);
    }


    // Not needed for now
    // async getKeyWithKeyIds(
    //     keyIds: string[],
    //     masterSaeId: string,
    //     slaveSaeId: string
    // ): Promise<KeyResponse[]> {
    //     const body = {
    //         key_IDs: keyIds,
    //         master_SAE_ID: masterSaeId,
    //         slave_SAE_ID: slaveSaeId,
    //     };
    //     return this.makeRequest<KeyResponse[]>('POST', '/api/v1/keys/ids', body);
    // }
}