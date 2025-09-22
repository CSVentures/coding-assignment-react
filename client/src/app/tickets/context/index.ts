import { Ticket, User } from "@acme/shared-models";
import { createContext } from "react";

export type TicketsContextType = {
  tickets: Ticket[];
  ticketDetail: Ticket | null;

  fetchTickets: () => Promise<void>;
  fetchTicketDetail: (id: number) => Promise<void>;

  createTicket: (ticket: Ticket, successCallback: () => void) => Promise<void>;
  assignTicket: (
    ticketId: number,
    userId: number,
    successCallback: () => void
  ) => Promise<void>;
  unassignTicket: (
    ticketId: number,
    successCallback: () => void
  ) => Promise<void>;
  completeTicket: (
    ticketId: number,
    successCallback: () => void
  ) => Promise<void>;
  incompleteTicket: (
    ticketId: number,
    successCallback: () => void
  ) => Promise<void>;

  isLoading: boolean;
  isLoadingDetail: boolean;
  isLoadingCreate: boolean;
  isLoadingUpdate: boolean;

  openModalCreateTicket: boolean;
  setOpenModalCreateTicket: (open: boolean) => void;
};

export const TicketsContext = createContext<TicketsContextType>({
  tickets: [],
  ticketDetail: null,
  fetchTickets: () => Promise.resolve(),
  fetchTicketDetail: () => Promise.resolve(),
  createTicket: (ticket: Ticket, successCallback: () => void) =>
    Promise.resolve(),
  assignTicket: (
    ticketId: number,
    userId: number,
    successCallback: () => void
  ) => Promise.resolve(),
  unassignTicket: (ticketId: number, successCallback: () => void) =>
    Promise.resolve(),
  completeTicket: (ticketId: number, successCallback: () => void) =>
    Promise.resolve(),
  incompleteTicket: (ticketId: number, successCallback: () => void) =>
    Promise.resolve(),
  isLoading: false,
  isLoadingDetail: false,
  isLoadingCreate: false,
  isLoadingUpdate: false,
  openModalCreateTicket: false,
  setOpenModalCreateTicket: () => {},
});
