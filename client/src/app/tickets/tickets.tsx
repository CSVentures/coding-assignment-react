import { Ticket } from "@acme/shared-models";
import styles from "./tickets.module.css";

export const TICKET_STATUS_OPTIONS = [
  {
    name: "completed_task",
    value: "completed",
  },
  {
    name: "incompleted_task",
    value: "incompleted",
  },
  {
    name: "all_task",
    value: "all",
  },
];

export const TICKET_STATUS_OPTIONS_CONST = {
  COMPLETED: TICKET_STATUS_OPTIONS[0].value,
  INCOMPLETED: TICKET_STATUS_OPTIONS[1].value,
  ALL: TICKET_STATUS_OPTIONS[2].value,
};

export interface TicketsProps {
  tickets: Ticket[];
  ticketDesc: string;
  onChangeTicketDesc: (desc: string) => void;
  onFilterTickets: (status: string) => void;
  onAddTicket: () => void;
}

export function Tickets(props: TicketsProps) {
  const { tickets, ticketDesc, onChangeTicketDesc, onFilterTickets, onAddTicket } = props;
  return (
    <div className={styles["tickets"]}>
      <h2>Tickets</h2>
      <div className={styles["ticket_add"]}>
        <input
          placeholder="Ticket description"
          value={ticketDesc}
          onChange={(e) => onChangeTicketDesc(e.target.value)}
        />
        <button onClick={onAddTicket}>Add</button>
      </div>
      <div>
        <div>Filter By:</div>
        <div className={styles["status_group"]}>
          {TICKET_STATUS_OPTIONS.map((opt, optId) => (
            <div className={styles["status_option"]} key={optId}>
              <input
                type="radio"
                id={opt.name}
                name="status"
                value={opt.value}
                defaultChecked={opt.value === TICKET_STATUS_OPTIONS_CONST.ALL}
                onChange={(e) => onFilterTickets(e.target.value)}
              />
              <label htmlFor={opt.name}>{opt.value}</label>
            </div>
          ))}
        </div>
      </div>
      {tickets ? (
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Ticket</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.description}</td>
                <td>
                  <a href={`/ticket/${t.id}`}>Details {`>>`}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <span>...</span>
      )}
    </div>
  );
}

export default Tickets;
