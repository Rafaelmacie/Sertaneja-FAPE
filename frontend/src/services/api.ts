import axios, { type AxiosResponse } from 'axios';
// O erro de "Cannot find module" ocorre se este arquivo não existir no caminho abaixo
import { type ILoginResponse, type ICadastroData, type IUser } from '../types/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const administrativoApi = {
  login: async (credentials: Pick<ICadastroData, 'email' | 'senha'>): Promise<ILoginResponse> => {
    const response: AxiosResponse<ILoginResponse> = await api.post('/usuarios/diretores/administrativo/login', credentials);
    return response.data;
  },
  
  cadastro: async (userData: ICadastroData): Promise<IUser> => {
    const response: AxiosResponse<IUser> = await api.post('/cadastro', userData);
    return response.data;
  },

  listar: async (): Promise<IUser[]> => {
    const response: AxiosResponse<IUser[]> = await api.get('/listar');
    return response.data;
  }
};

export default api;