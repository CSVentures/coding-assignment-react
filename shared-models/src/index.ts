export type User = {
  id: number;
  name: string;
};

export type Ticket = {
  id: number;
  description: string;
  assigneeId: null | number;
  completed: boolean;
};

export type TicketStatus = 'all' | 'complete' | 'incomplete';

export type AppError = {
  message: string;
  code?: string;
  status?: number;
  cause?: unknown;
};

export interface TicketState {
  tickets: Ticket[];
  users: User[];
  loading: boolean;
  error: AppError | null;
  filter: TicketStatus;
}

export type TicketAction =
  | { type: 'SET_TICKETS'; payload: Ticket[] }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'ADD_TICKET'; payload: Ticket }
  | { type: 'UPDATE_TICKET'; payload: Ticket }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: AppError | null }
  | { type: 'SET_FILTER'; payload: TicketStatus }
  | { type: 'OPTIMISTIC_UPDATE'; payload: Ticket }
  | { type: 'ROLLBACK_UPDATE'; payload: Ticket };

