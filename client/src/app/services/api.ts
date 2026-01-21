import { Ticket, User } from '@acme/shared-models';

const API_BASE = 'http://localhost:4200/api';

class TicketAPI {
  private abortController: AbortController | null = null;

  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    this.abortController = new AbortController();

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      signal: this.abortController.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    // 204 No Content responses have no body, don't try to parse JSON
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  abort() {
    this.abortController?.abort();
  }

  async getTickets(): Promise<Ticket[]> {
    return this.fetch<Ticket[]>('/tickets');
  }

  async getTicket(id: number): Promise<Ticket> {
    return this.fetch<Ticket>(`/tickets/${id}`);
  }

  async getUsers(): Promise<User[]> {
    return this.fetch<User[]>('/users');
  }

  async createTicket(description: string): Promise<Ticket> {
    return this.fetch<Ticket>('/tickets', {
      method: 'POST',
      body: JSON.stringify({ description }),
    });
  }

  async updateTicket(id: number, updates: Partial<Ticket>): Promise<Ticket> {
    return this.fetch<Ticket>(`/tickets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async assignTicket(id: number, userId: number): Promise<void> {
    return this.fetch<void>(`/tickets/${id}/assign/${userId}`, {
      method: 'PUT',
    });
  }

  async unassignTicket(id: number): Promise<void> {
    return this.fetch<void>(`/tickets/${id}/unassign`, {
      method: 'PUT',
    });
  }

  async completeTicket(id: number): Promise<void> {
    return this.fetch<void>(`/tickets/${id}/complete`, {
      method: 'PUT',
    });
  }

  async incompleteTicket(id: number): Promise<void> {
    return this.fetch<void>(`/tickets/${id}/complete`, {
      method: 'DELETE',
    });
  }
}

export const api = new TicketAPI();
