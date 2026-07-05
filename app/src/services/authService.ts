import { apiFetch } from './api';
import { LoginResponse, User } from '../types/User';

export async function loginUsuario(email: string, senha: string): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha })
  });
}

export async function cadastrarUsuario(data: {
  name: string;
  email: string;
  senha: string;
}): Promise<User> {
  return apiFetch<User>('/usuarios', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}
