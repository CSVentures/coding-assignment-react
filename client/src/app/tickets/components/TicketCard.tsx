import { Ticket } from '@acme/shared-models';
import { ChangeEvent } from 'react';
import { useTickets } from '../../context/TicketContext';
import styles from '../tickets.module.css';

interface TicketCardProps {
  ticket: Ticket;
  onClick: () => void;
}

export function TicketCard({ ticket, onClick }: TicketCardProps) {
  const { users, completeTicket } = useTickets();
  const assignee = users.find((u) => u.id === ticket.assigneeId);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    completeTicket(ticket.id, e.target.checked);
  };

  return (
    <div className={styles['ticketCard']} onClick={onClick}>
      <div className={styles['ticketContent']}>
        <p
          className={`${styles['ticketDescription']} ${
            ticket.completed ? styles['completed'] : ''
          }`}
        >
          {ticket.description}
        </p>
        <input
          type='checkbox'
          checked={ticket.completed}
          onChange={handleCheckboxChange}
          className={styles['ticketCheckbox']}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div className={styles['ticketMeta']}>
        <span
          className={`${styles['badge']} ${
            ticket.completed
              ? styles['badgeComplete']
              : styles['badgeIncomplete']
          }`}
        >
          {ticket.completed ? 'Complete' : 'Incomplete'}
        </span>
        {assignee && (
          <span className={styles['assignee']}>
            Assigned to: {assignee.name}
          </span>
        )}
      </div>
    </div>
  );
}
