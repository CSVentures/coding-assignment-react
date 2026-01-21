import { useTickets } from '../context/TicketContext';

export function useFilteredTickets() {
  const { tickets, filter } = useTickets();

  return tickets.filter((ticket) => {
    if (filter === 'complete') return ticket.completed;
    if (filter === 'incomplete') return !ticket.completed;
    return true;
  });
}
