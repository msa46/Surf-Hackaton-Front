function stringToBytes(str: string): number[] {
        const bytes: number[] = [];
        for (let i = 0; i < str.length; i++) {
            bytes.push(str.charCodeAt(i));
        }
        return bytes;
    }

    function bytesToString(bytes: number[]): string {
        return bytes.map(byte => String.fromCharCode(byte)).join('');
    }

    function bytesToHex(bytes: number[]): string {
        return bytes.map(byte => byte.toString(16).padStart(2, '0')).join('');
    }

    function hexToBytes(hex: string): number[] {
        const bytes: number[] = [];
        for (let i = 0; i < hex.length; i += 2) {
            bytes.push(parseInt(hex.substr(i, 2), 16));
        }
        return bytes;
    }
}

export function encrypt(input: string, key: string): string {
        if (!input || !key) {
            throw new Error('Input and key cannot be empty');
        }

        // Convert input and key to array of character codes
        const inputBytes = stringToBytes(input);
        const keyBytes = stringToBytes(key);
        
        // Perform XOR operation
        const result: number[] = [];
        for (let i = 0; i < inputBytes.length; i++) {
            // Use modulo to repeat the key if it's shorter than input
            const keyByte = keyBytes[i % keyBytes.length];
            result.push(inputBytes[i] ^ keyByte);
        }

        // Convert to hex string
        return bytesToHex(result);
    }