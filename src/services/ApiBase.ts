import axios from 'axios';

export interface IResponse<T> {
    data?: T;
    error: any;
    status?: number | boolean;
    message?: string;
}

// export interface IResponseApiData<T> {
//     data?: T;
//     statusCode?: number | boolean;
//     message?: string;
// }

export interface INonDataResponse {
    error: any;
    status?: number | boolean;
    message?: string;
}

const env = import.meta.env;

export default class RestApi {
    private static readonly API_URL = env.VITE_API_URL;
    private static readonly API_KEY = env.VITE_API_KEY;

    // Recupera o token JWT do sessionStorage (se existir)
    private static getAuthToken(): string | null {
        return sessionStorage.getItem('token');
    }

    public getApiUrl(): string {
        return RestApi.API_URL;
    }

    static instanceAxios = axios.create({
        baseURL: RestApi.API_URL,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'accept': 'application/json',
            'x-api-key': RestApi.API_KEY
        }
    });

    // Método para definir o token JWT
    static setAuthToken() {
        const token = RestApi.getAuthToken();
        if (token) {
            RestApi.instanceAxios.defaults.headers['Authorization'] = `Bearer ${token}`;
        }
    }

    // Bloco estático para configurar o interceptor corretamente
    static {
        // Aqui o interceptor é configurado para garantir que o token esteja no cabeçalho
        this.instanceAxios.interceptors.request.use((config) => {
            const token = RestApi.getAuthToken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    }

    public static async httpGet<T>(url: string): Promise<IResponse<T>> {
        this.setAuthToken();  // Garantir que o token esteja sempre atualizado
        return this.instanceAxios.get(url);
    }

    public static async httpPost<T>(url: string, data: any, options?: any): Promise<IResponse<T>> {
        this.setAuthToken();  // Garantir que o token esteja sempre atualizado
        return this.instanceAxios.post(url, data, options);
    }

    public static async httpPut<T>(url: string, data: any, options?: any): Promise<IResponse<T>> {
        this.setAuthToken();  // Garantir que o token esteja sempre atualizado
        return this.instanceAxios.put(url, data, options);
    }

    public static async httpDelete<T>(url: string): Promise<IResponse<T>> {
        this.setAuthToken();  // Garantir que o token esteja sempre atualizado
        return this.instanceAxios.delete(url);
    }
}
