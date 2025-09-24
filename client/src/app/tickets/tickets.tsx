import { Ticket } from "@acme/shared-models";
import { Button, message, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useAddTicket, useTickets } from "../hooks/useTickets";
import { useUsers } from "../hooks/useUsers";
import AddTicketModal from "./add-ticket-modal";
import TicketsTable from "./table";
import styles from "./tickets.module.css";

export interface TicketsProps {
  tickets: Ticket[];
}

export function Tickets() {
  const [open, setOpen] = useState(false);

  const { data: users = [] } = useUsers();

  const { data: tickets = [], isLoading: isTicketsLoading } = useTickets();
  const [status, setStatus] = useState("all");

  const { mutateAsync: addTicket, isPending: isAddTicketLoading } =
    useAddTicket();

  const [filteredTickets, setFilteredTickets] = useState(tickets);

  useEffect(() => {
    if (status === "all") {
      setFilteredTickets(tickets);
    } else {
      setFilteredTickets(
        tickets.filter((ticket) =>
          status === "completed" ? ticket.completed : !ticket.completed
        )
      );
    }
  }, [status, tickets]);

  const handleAddTicket = async (description: string) => {
    try {
      await addTicket({ description });
      setOpen(false);
      message.success("Ticket added successfully");
    } catch (err) {
      message.error("Failed to add ticket");
    }
  };

  return (
    <div className={styles["tickets"]}>
      <Space wrap style={{ marginBottom: 16 }}>
        <Select
          defaultValue="all"
          style={{ width: 130 }}
          onChange={setStatus}
          options={[
            { value: "all", label: "All" },
            { value: "completed", label: "Completed" },
            { value: "incompleted", label: "Incompleted" },
          ]}
        />
        <Button type="primary" onClick={() => setOpen(true)}>
          Add Ticket
        </Button>
      </Space>

      <TicketsTable
        users={users}
        tickets={filteredTickets}
        isLoading={isTicketsLoading}
      />
      <AddTicketModal
        onAddTicket={handleAddTicket}
        open={open}
        onCancel={() => setOpen(false)}
        isConfirmLoading={isAddTicketLoading || isTicketsLoading}
      />
    </div>
  );
}

export default Tickets;
