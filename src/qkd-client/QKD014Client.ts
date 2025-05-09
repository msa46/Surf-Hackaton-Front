// src/qkd-client/QKD014Client.ts
interface QKDConfig {
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
            throw new Error(`Failed to load certificates: ${error.message}`);
        }
    }

    private async makeRequest<T>(
        method: string,
        path: string,
        body?: any
    ): Promise<T> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        try {
            // Create credentials object
            const credentials = await this.createCredentials();

            const headers = new Headers({
                'Content-Type': 'application/json',
                'X-Client-Cert': await this.blobToBase64(this.certBlob),
                'X-Client-Key': await this.blobToBase64(this.keyBlob),
            });

            if (this.caBlob) {
                headers.append('X-CA-Cert', await this.blobToBase64(this.caBlob));
            }

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

    private async blobToBase64(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result.split(',')[1]);
                } else {
                    reject(new Error('Failed to convert blob to base64'));
                }
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
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

                if (this.config.caPath) {
                    const caResponse = await fetch(this.config.caPath);
                    this.ca = await caResponse.text();
                }
            }
        } catch (error) {
            throw new Error(`Failed to load certificates: ${error.message}`);
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

    async getKeyWithKeyIds(
        keyIds: string[],
        masterSaeId: string,
        slaveSaeId: string
    ): Promise<KeyResponse[]> {
        const body = {
            key_IDs: keyIds,
            master_SAE_ID: masterSaeId,
            slave_SAE_ID: slaveSaeId,
        };
        return this.makeRequest<KeyResponse[]>('POST', '/api/v1/keys/ids', body);
    }
}