import { Ticket } from "@acme/shared-models";

export const fetchTickets = async () => {
  const response = await fetch("/api/tickets");
  return response.json();
};

export const fetchTicketDetail = async (id: number) => {
  const response = await fetch(`/api/tickets/${id}`);
  return response.json();
};

export const createTicket = async (ticket: Ticket) => {
  const response = await fetch("/api/tickets", {
    method: "POST",
    body: JSON.stringify(ticket),
  });
  return response.json();
};

export const assignTicket = async (ticketId: number, userId: number) => {
  const response = await fetch(`/api/tickets/${ticketId}/assign/${userId}`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error(`Failed to assign ticket: ${response.statusText}`);
  }
  return;
};

export const unassignTicket = async (ticketId: number) => {
  const response = await fetch(`/api/tickets/${ticketId}/unassign`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error(`Failed to unassign ticket: ${response.statusText}`);
  }
  return;
};

export const completeTicket = async (id: number) => {
  const response = await fetch(`/api/tickets/${id}/complete`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error(`Failed to complete ticket: ${response.statusText}`);
  }

  return;
};

export const incompleteTicket = async (id: number) => {
  const response = await fetch(`/api/tickets/${id}/complete`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to mark ticket as incomplete: ${response.statusText}`
    );
  }

  return;
};
