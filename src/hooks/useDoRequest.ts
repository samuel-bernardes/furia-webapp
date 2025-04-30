import { useRef, useState } from 'react';
import RestAPIEndpoints from '../services';
import axios, { AxiosError } from 'axios';

interface IUseDoRequestActions<input, output> {
    loading: boolean;
    doRequest: (data: input) => Promise<output>;
}

function useDoRequest<input, output>(
    apiRequest: (a: typeof RestAPIEndpoints) => (data: input) => Promise<output>
): IUseDoRequestActions<input, output> {
    const [loading, setLoading] = useState(false);
    const dataRef = useRef<input | null>(null);
    /* const snackbar = useSnackbar(); */
    /* const { signOut } = useAuth(); */

    async function doRequest(data: input): Promise<output> {
        return new Promise(async (resolve, reject) => {
            try {
                dataRef.current = data;
                setLoading(true);
                const result = await apiRequest(RestAPIEndpoints)(data);
                setLoading(false);
                resolve(result);
            } catch (error: unknown | AxiosError) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        // 🛑 Token Expirado (401)
                        if (error.response.status === 401 && error.response.data?.message === "Token inválido" || error.response.data?.message === "Token não fornecido") {
                            //snackbar.showSnackbar('Usuário desconectado! Entre novamente.', 'error');
                            /* signOut(); */
                        }

                        // 🚫 Limite de tentativas excedido (429)
                        if (error.response.status === 400 && error.response.data?.error) {
                            //snackbar.showSnackbar('Você atingiu o limite de tentativas! Tente novamente mais tarde.', 'warning');
                        }
                    }
                }

                setLoading(false);
                reject(error);
            }
        });
    }

    return {
        loading,
        doRequest,
    };
}

export default useDoRequest;
