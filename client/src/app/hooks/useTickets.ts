import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Ticket } from "@acme/shared-models";

export const ticketsKey = {
  all: ["tickets"] as const,
  lists: () => [...ticketsKey.all, "list"] as const,
  list: (filters: string) => [...ticketsKey.lists(), filters] as const,
  details: () => [...ticketsKey.all, "detail"] as const,
  detail: (id: string) => [...ticketsKey.details(), id] as const,
};

// get tickets
export const useTickets = () => {
  return useQuery<Ticket[]>({
    queryKey: ticketsKey.all,
    queryFn: () => fetch("/api/tickets").then((res) => res.json()),
  });
};

// get ticket
export const useTicket = (id: number) => {
  return useQuery<Ticket>({
    queryKey: ticketsKey.detail(id.toString()),
    queryFn: () => fetch(`/api/tickets/${id}`).then((res) => res.json()),
  });
};

// mutate add ticket
export const useAddTicket = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { description: string }>({
    mutationFn: ({ description }) =>
      fetch("/api/tickets", {
        method: "POST",
        body: JSON.stringify(description),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketsKey.all });
    },
  });
};

// mutate assign ticket
export const useAssignTicket = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { ticketId: number; userId: number }>({
    mutationFn: ({ ticketId, userId }) =>
      fetch(`/api/tickets/${ticketId}/assign/${userId}`, {
        method: "PUT",
      }),
    onSuccess: (_, { ticketId }) => {
      queryClient.invalidateQueries({ queryKey: ticketsKey.all });
      queryClient.invalidateQueries({
        queryKey: ticketsKey.detail(ticketId.toString()),
      });
    },
  });
};

// mutate unassign ticket
export const useUnassignTicket = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { ticketId: number }>({
    mutationFn: ({ ticketId }) =>
      fetch(`/api/tickets/${ticketId}/unassign`, {
        method: "PUT",
      }),
    onSuccess: (_, { ticketId }) => {
      queryClient.invalidateQueries({ queryKey: ticketsKey.all });
      queryClient.invalidateQueries({
        queryKey: ticketsKey.detail(ticketId.toString()),
      });
    },
  });
};

// mutate mark as complete
export const useMarkAsComplete = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { ticketId: number }>({
    mutationFn: ({ ticketId }) =>
      fetch(`/api/tickets/${ticketId}/complete`, {
        method: "PUT",
      }),
    onSuccess: (_, { ticketId }) => {
      queryClient.invalidateQueries({ queryKey: ticketsKey.all });
      queryClient.invalidateQueries({
        queryKey: ticketsKey.detail(ticketId.toString()),
      });
    },
  });
};

// mutate mark as incomplete
export const useMarkAsIncomplete = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { ticketId: number }>({
    mutationFn: ({ ticketId }) =>
      fetch(`/api/tickets/${ticketId}/complete`, {
        method: "DELETE",
      }),
    onSuccess: (_, { ticketId }) => {
      queryClient.invalidateQueries({ queryKey: ticketsKey.all });
      queryClient.invalidateQueries({
        queryKey: ticketsKey.detail(ticketId.toString()),
      });
    },
  });
};
