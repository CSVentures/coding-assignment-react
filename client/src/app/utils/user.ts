import { Ticket, User } from "@acme/shared-models";

export const MappingTicketUser = (ticket: Ticket, users: User[]) => {
  console.log("ticket", ticket);
  console.log("users", users);
  return users.find((user) => user.id === ticket.assigneeId);
};
