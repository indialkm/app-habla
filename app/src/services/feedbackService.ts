import { apiFetch } from './api';
import { Feedback, NovoFeedback, SetorFiltro } from '../types/Feedback';

export async function listarFeedbacks(): Promise<Feedback[]> {
  return apiFetch<Feedback[]>('/feedbacks');
}

export async function listarFeedbacksDoUsuario(usuarioId: number): Promise<Feedback[]> {
  return apiFetch<Feedback[]>(`/feedbacks/me/${usuarioId}`);
}

export async function listarFeedbacksPorSetor(setor: SetorFiltro): Promise<Feedback[]> {
  if (setor === 'TODOS') return listarFeedbacks();
  return apiFetch<Feedback[]>(`/feedbacks/setor?setor=${setor}`);
}

export async function buscarFeedbackPorId(id: number): Promise<Feedback> {
  return apiFetch<Feedback>(`/feedbacks/${id}`);
}

export async function cadastrarFeedback(data: NovoFeedback): Promise<Feedback> {
  return apiFetch<Feedback>('/feedbacks', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function excluirFeedback(id: number): Promise<void> {
  return apiFetch<void>(`/feedbacks/${id}`, {
    method: 'DELETE'
  });
}
