import { useState, useCallback } from 'react';
import { QKD014Client } from './QKD014Client';
import type { QKDConfig as QKDClientConfig } from './QKD014Client';

export function useQKDClient(config: QKDClientConfig ) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const client = new QKD014Client(
        import.meta.env.QKD_API_URL || 'http://localhost:3001',
        config
    );

    const getStatus = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            return await client.getStatus();
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const getKey = useCallback(async (
        keySize: number,
        masterSaeId: string,
        slaveSaeId: string,
        keyCount: number = 1
    ) => {
        try {
            setLoading(true);
            setError(null);
            return await client.getKey(keySize, masterSaeId, slaveSaeId, keyCount);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Not implemented in QKD014Client
    // const getKeyWithKeyIds = useCallback(async (
    //     keyIds: string[],
    //     masterSaeId: string,
    //     slaveSaeId: string
    // ) => {
    //     try {
    //         setLoading(true);
    //         setError(null);
    //         return await client.getKeyWithKeyIds(keyIds, masterSaeId, slaveSaeId);
    //     } catch (err) {
    //         setError(err instanceof Error ? err : new Error('Unknown error'));
    //         throw err;
    //     } finally {
    //         setLoading(false);
    //     }
    // }, []);

    return {
        loading,
        error,
        getStatus,
        getKey,
    };
}