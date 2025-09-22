import { useEffect, useState } from "react";
import { TicketsContext } from "../context";
import { useTickets } from "../hooks/useTickets";
import useQueries from "../../hooks/useQueries";

export default function TicketsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    tickets,
    ticketDetail,
    handleFetchTickets,
    handleFetchTicketDetail,
    handleCreateTicket,
    handleAssignTicket,
    handleUnassignTicket,
    handleCompleteTicket,
    handleIncompleteTicket,

    isLoading,
    isLoadingDetail,
    isLoadingCreate,
    isLoadingUpdate,
  } = useTickets();

  const [openModalCreateTicket, setOpenModalCreateTicket] = useState(false);

  useEffect(() => {
    handleFetchTickets();
  }, []);

  return (
    <TicketsContext.Provider
      value={{
        tickets,
        ticketDetail,
        fetchTickets: handleFetchTickets,
        fetchTicketDetail: handleFetchTicketDetail,
        createTicket: handleCreateTicket,
        assignTicket: handleAssignTicket,
        unassignTicket: handleUnassignTicket,
        completeTicket: handleCompleteTicket,
        incompleteTicket: handleIncompleteTicket,

        isLoading,
        isLoadingDetail,
        isLoadingCreate,
        isLoadingUpdate,

        setOpenModalCreateTicket,
        openModalCreateTicket,
      }}
    >
      {children}
    </TicketsContext.Provider>
  );
}
