export interface IUser {
  id_usuario: string;
  nome: string;
  email: string;
}

export interface ILoginResponse {
  auth: boolean;
  token: string;
  user: IUser;
}

export interface ICadastroData {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone: string;
}