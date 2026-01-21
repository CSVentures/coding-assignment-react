import {
  AppError,
  Ticket,
  TicketAction,
  TicketState,
  TicketStatus,
} from '@acme/shared-models';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { api } from '../services/api';

const initialState: TicketState = {
  tickets: [],
  users: [],
  loading: false,
  error: null,
  filter: 'all',
};

function ticketReducer(state: TicketState, action: TicketAction): TicketState {
  switch (action.type) {
    case 'SET_TICKETS':
      return { ...state, tickets: action.payload, loading: false };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'ADD_TICKET':
      return { ...state, tickets: [...state.tickets, action.payload] };
    case 'UPDATE_TICKET':
      return {
        ...state,
        tickets: state.tickets.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        ),
      };
    case 'OPTIMISTIC_UPDATE':
      return {
        ...state,
        tickets: state.tickets.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        ),
      };
    case 'ROLLBACK_UPDATE':
      return {
        ...state,
        tickets: state.tickets.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        ),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

interface TicketContextValue extends TicketState {
  fetchTickets: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  createTicket: (description: string) => Promise<void>;
  assignTicket: (id: number, userId: number) => Promise<void>;
  completeTicket: (id: number, completed: boolean) => Promise<void>;
  setFilter: (filter: TicketStatus) => void;
  getTicketById: (id: number) => Ticket | undefined;
}

const TicketContext = createContext<TicketContextValue | undefined>(undefined);

export function TicketProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(ticketReducer, initialState);
  const previousTicketsRef = useRef<Map<number, Ticket>>(new Map());

  const toAppError = useCallback((err: unknown): AppError => {
    if (err && typeof err === 'object') {
      const anyErr = err as Error;
      return {
        message: anyErr.message,
        status: (anyErr as unknown as { status: number }).status,
        code: (anyErr as unknown as { code: string }).code,
        cause: err,
      };
    }
    return { message: 'Unknown error', cause: err };
  }, []);

  const fetchTickets = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const tickets = await api.getTickets();
      dispatch({ type: 'SET_TICKETS', payload: tickets });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        dispatch({ type: 'SET_ERROR', payload: toAppError(err) });
      }
    }
  }, [toAppError]);

  const fetchUsers = useCallback(async () => {
    try {
      const users = await api.getUsers();
      dispatch({ type: 'SET_USERS', payload: users });
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        dispatch({ type: 'SET_ERROR', payload: toAppError(err) });
      }
    }
  }, [toAppError]);

  const createTicket = useCallback(
    async (description: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const ticket = await api.createTicket(description);
        dispatch({ type: 'ADD_TICKET', payload: ticket });
        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (err: unknown) {
        dispatch({ type: 'SET_ERROR', payload: toAppError(err) });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    [toAppError],
  );

  const assignTicket = useCallback(
    async (id: number, userId: number) => {
      const original = state.tickets.find((t) => t.id === id);
      if (!original) return;

      // Store original for potential rollback
      previousTicketsRef.current.set(id, original);

      // Optimistic update
      const optimistic = { ...original, assigneeId: userId };
      dispatch({ type: 'OPTIMISTIC_UPDATE', payload: optimistic });

      try {
        await api.assignTicket(id, userId);
        // Server responds 204 (no content). Keep optimistic state on success.
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError') {
          // Rollback on error
          dispatch({ type: 'ROLLBACK_UPDATE', payload: original });
          dispatch({ type: 'SET_ERROR', payload: toAppError(err) });
        }
      }
    },
    [state.tickets, toAppError],
  );

  const completeTicket = useCallback(
    async (id: number, completed: boolean) => {
      const original = state.tickets.find((t) => t.id === id);
      if (!original) return;

      // Store original for potential rollback
      previousTicketsRef.current.set(id, original);

      // Optimistic update
      const optimistic = { ...original, completed };
      dispatch({ type: 'OPTIMISTIC_UPDATE', payload: optimistic });

      try {
        if (completed) {
          await api.completeTicket(id);
        } else {
          await api.incompleteTicket(id);
        }
        // Server responds 204 (no content). Keep optimistic state on success.
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError') {
          // Rollback on error
          dispatch({ type: 'ROLLBACK_UPDATE', payload: original });
          dispatch({ type: 'SET_ERROR', payload: toAppError(err) });
        }
      }
    },
    [state.tickets, toAppError],
  );

  const setFilter = useCallback((filter: TicketStatus) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, []);

  const getTicketById = useCallback(
    (id: number) => {
      return state.tickets.find((t) => t.id === id);
    },
    [state.tickets],
  );

  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      // Both have completed (success or failure)
      Promise.allSettled([fetchTickets(), fetchUsers()]);
    };

    loadData();

    return () => {
      api.abort();
    };
  }, [fetchTickets, fetchUsers]);

  return (
    <TicketContext.Provider
      value={{
        ...state,
        fetchTickets,
        fetchUsers,
        createTicket,
        assignTicket,
        completeTicket,
        setFilter,
        getTicketById,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within TicketProvider');
  }
  return context;
}
