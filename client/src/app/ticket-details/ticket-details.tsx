import { Ticket, User } from "@acme/shared-models";
import styles from "./ticket-details.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/* eslint-disable-next-line */
export interface TicketDetailsProps {
  users: User[];
}

export function TicketDetails(props: TicketDetailsProps) {
  let { id } = useParams();
  const { users } = props;
  const [ticket, setTicket] = useState<Ticket | null>(null);

  async function getTicketDetails() {
    const data = await fetch(`/api/tickets/${id}`).then();
    const ticketData = await data.json();
    setTicket(ticketData);
  }

  function updateTicketAssignee(userId: string) {
    fetch(`/api/tickets/${id}/assign/${userId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => getTicketDetails());
  }

  function unAssignTicket() {
    fetch(`/api/tickets/${id}/unassign`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => getTicketDetails());
  }

  function updateTicketComplete() {
    fetch(`/api/tickets/${id}/complete`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => getTicketDetails());
  }

  function removeTicketComplete() {
    fetch(`/api/tickets/${id}/complete`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => getTicketDetails());
  }

  const onChangeAssignee = (id: string) => {
    if (!id || id === "") {
      unAssignTicket();
      return;
    }
    updateTicketAssignee(id);
  };

  const onUpdateCompletion = (isCompleted: boolean) => {
    if (isCompleted) {
      updateTicketComplete();
    } else {
      removeTicketComplete();
    }
  };

  useEffect(() => {
    if (id && id !== "") {
      getTicketDetails();
    }
  }, [id]);

  return (
    <div className={styles["container"]}>
      <a href="/">{`<<`} Return to list</a>
      <h1>Welcome to TicketDetails!</h1>
      {ticket ? (
        <div className={styles["details"]}>
          <div>Description: {ticket.description}</div>
          <div>
            <span>Assignee: </span>
            <select onChange={(e) => onChangeAssignee(e.target.value)} defaultValue={ticket.assigneeId || ""}>
              <option value="">Assign to someone</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status">Is completed:</label>
            <input
              type="checkbox"
              checked={ticket.completed}
              onChange={(e) => onUpdateCompletion(e.target.checked)}
              id="status"
            />
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
}

export default TicketDetails;
