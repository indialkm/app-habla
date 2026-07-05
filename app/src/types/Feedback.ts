import { User } from './User';

export type FeedbackTipo = 'reclamacao' | 'elogio' | 'sugestao';
export type Setor = 'RH' | 'FISCAL' | 'TI' | 'JURIDICO';
export type SetorFiltro = Setor | 'TODOS';

export interface Feedback {
  id: number;
  tipo: FeedbackTipo;
  mensagem: string;
  anonimo: boolean;
  usuarioId: number;
  setor: Setor;
  nota: number;
  data: string;
  usuario?: Pick<User, 'id' | 'name' | 'email' | 'role'> | {
    id: null;
    name: string;
    email: null;
    role: null;
  };
}

export interface NovoFeedback {
  tipo: FeedbackTipo;
  mensagem: string;
  anonimo: boolean;
  usuarioId: number;
  setor: Setor;
  nota: number;
}
