import { createFileRoute } from '@tanstack/react-router'
import { useQKDClient } from '@/qkd-client/useQKDClient';
import { type KeyResponse } from '@/qkd-client/QKD014Client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  const [key, setKey] = useState<KeyResponse | null>(null);
  const { getKey } = useQKDClient({
            certPath: import.meta.env.CERT_PATH ,
    keyPath: import.meta.env.KEY_PATH,
    timeout:10000
    });
  useEffect( () => {
              const fetchKeys = async () => {
              try {
                const keys = await getKey(256, 'hackathon-asd001b', 'hackathon-ut042a', 1);
                // axios.defaults.baseURL = '';
                // await axios.get('google.com')
                setKey(keys[0]);
              } catch (error) {
                console.error('Error fetching keys:', error);
              }
            };
            fetchKeys();
            console.log('keys are:', key)
          }, []); 
  return <div>key is {key ? `ID: ${key.keyId}, Data: ${key.keyData}` : 'No key available'}</div>
}
