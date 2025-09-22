import { Ticket } from "@acme/shared-models";
import { useState } from "react";
import {
  assignTicket,
  completeTicket,
  createTicket,
  fetchTicketDetail,
  fetchTickets,
  incompleteTicket,
  unassignTicket,
} from "../services";
import { showErrotNotification } from "../../component/messages";

export const useTickets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [ticketDetail, setTicketDetail] = useState<Ticket | null>(null);
  const handleFetchTickets = async () => {
    try {
      setIsLoading(true);
      const tickets = await fetchTickets();
      setTickets(tickets);
    } catch (error) {
      showErrotNotification(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchTicketDetail = async (id: number) => {
    try {
      setIsLoadingDetail(true);
      const ticket = await fetchTicketDetail(id);

      setTicketDetail(ticket);
    } catch (error) {
      showErrotNotification(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const handleCreateTicket = async (
    ticket: Ticket,
    successCallback: () => void
  ) => {
    try {
      setIsLoadingCreate(true);
      const newTicket = await createTicket(ticket);
      setTickets([newTicket, ...tickets]);
      successCallback();
    } catch (error) {
      showErrotNotification(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsLoadingCreate(false);
    }
  };

  const handleAssignTicket = async (
    ticketId: number,
    userId: number,
    successCallback: () => void
  ) => {
    try {
      setIsLoadingUpdate(true);
      await assignTicket(ticketId, userId);
      successCallback();
    } catch (error) {
      showErrotNotification(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  const handleUnassignTicket = async (
    ticketId: number,
    successCallback: () => void
  ) => {
    try {
      setIsLoadingUpdate(true);
      await unassignTicket(ticketId);

      successCallback();
    } catch (error) {
      showErrotNotification(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsLoadingUpdate(false);
    }
  };
  const handleCompleteTicket = async (
    ticketId: number,
    successCallback: () => void
  ) => {
    try {
      setIsLoadingUpdate(true);
      await completeTicket(ticketId);
      successCallback();
    } catch (error) {
      showErrotNotification(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  const handleIncompleteTicket = async (
    ticketId: number,
    successCallback: () => void
  ) => {
    try {
      setIsLoadingUpdate(true);
      await incompleteTicket(ticketId);
      successCallback();
    } catch (error) {
      showErrotNotification(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  return {
    handleFetchTickets,
    tickets,
    handleFetchTicketDetail,
    ticketDetail,
    handleCreateTicket,
    handleAssignTicket,
    handleUnassignTicket,
    handleCompleteTicket,
    handleIncompleteTicket,
    isLoading,
    isLoadingDetail,
    isLoadingCreate,
    isLoadingUpdate,
  };
};
