import { Platform } from 'react-native';

// Na web, localhost funciona. No celular físico, troque pelo IP do seu computador.
// Exemplo: http://192.168.18.5:3000
export const BASE_URL = Platform.OS === 'web'
  ? 'http://localhost:3000'
  : 'http://SEU_IP_AQUI:3000';

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    }
  });

  if (!response.ok) {
    let message = 'Erro na requisição';

    try {
      const errorBody = await response.json();
      message = errorBody.message || message;
    } catch (error) {
      // Mantém mensagem padrão se não vier JSON.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}
