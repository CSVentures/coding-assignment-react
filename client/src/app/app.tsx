import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Ticket, User } from "@acme/shared-models";

import styles from "./app.module.css";
import Tickets, { TICKET_STATUS_OPTIONS_CONST } from "./tickets/tickets";
import TicketDetails from "./ticket-details/ticket-details";

export type CreateTicketRequest = {
  description: string;
};

const App = () => {
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [ticketDesc, setTicketDesc] = useState<string>("");
  const [users, setUsers] = useState([] as User[]);

  // Very basic way to synchronize state with server.
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).
  async function fetchTickets() {
    const data = await fetch("/api/tickets").then();
    const ticketsData = await data.json();
    setTickets(ticketsData);
    setFilteredTickets(ticketsData);
  }

  async function fetchUsers() {
    const data = await fetch("/api/users").then();
    setUsers(await data.json());
  }

  async function addTicket(req: CreateTicketRequest) {
    const data = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(req),
    }).then();
    const ticketData = await data.json();
    if (ticketData) {
      fetchTickets();
    }
  }

  function handleFilterTickets(status: string) {
    const clonedTickets = structuredClone(tickets);
    switch (status) {
      case TICKET_STATUS_OPTIONS_CONST.COMPLETED:
        setFilteredTickets(clonedTickets.filter((item) => item.completed));
        break;
      case TICKET_STATUS_OPTIONS_CONST.INCOMPLETED:
        setFilteredTickets(clonedTickets.filter((item) => !item.completed));
        break;
      default:
        setFilteredTickets(tickets);
    }
  }

  function handleAddTicket() {
    if (!ticketDesc || ticketDesc === "") {
      alert("Ticket description can not be empty!");
      return;
    }
    addTicket({ description: ticketDesc });
  }

  useEffect(() => {
    fetchTickets();
    fetchUsers();
  }, []);

  return (
    <div className={styles["app"]}>
      <h1>Ticketing App</h1>
      <Routes>
        <Route
          path="/"
          element={
            <Tickets
              tickets={filteredTickets}
              ticketDesc={ticketDesc}
              onChangeTicketDesc={(des) => setTicketDesc(des)}
              onFilterTickets={handleFilterTickets}
              onAddTicket={handleAddTicket}
            />
          }
        />
        {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
        <Route path="/ticket/:id" element={<TicketDetails users={users} />} />
      </Routes>
    </div>
  );
};

export default App;
