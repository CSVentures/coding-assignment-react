import { ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTickets } from '../../context/TicketContext';
import styles from '../tickets.module.css';

export function TicketDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getTicketById, users, assignTicket, completeTicket } = useTickets();

  const ticketId = id ? parseInt(id) : null;
  const ticket = ticketId ? getTicketById(ticketId) : null;

  const handleBack = () => {
    navigate('/');
  };

  if (!ticket) {
    return (
      <div className={styles['container']}>
        <button
          onClick={handleBack}
          className={`${styles['button']} ${styles['buttonSecondary']}`}
        >
          ← Back
        </button>
        <p className={styles['emptyState']}>Ticket not found</p>
      </div>
    );
  }

  const assignee = users.find((u) => u.id === ticket.assigneeId);

  const handleAssignChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(e.target.value);
    if (userId) {
      assignTicket(ticket.id, userId);
    }
  };

  const handleCompleteChange = (e: ChangeEvent<HTMLInputElement>) => {
    completeTicket(ticket.id, e.target.checked);
  };

  return (
    <div className={styles['container']}>
      <button
        onClick={handleBack}
        className={`${styles['button']} ${styles['buttonSecondary']}`}
        style={{ marginBottom: '1.5rem' }}
      >
        ← Back to List
      </button>

      <div className={styles['detailsCard']}>
        <h1 className={styles['detailsTitle']}>Ticket #{ticket.id}</h1>

        <div className={styles['detailsSection']}>
          <label className={styles['label']}>Description</label>
          <p>{ticket.description}</p>
        </div>

        <div className={styles['detailsSection']}>
          <label htmlFor={`${ticket.id}-status`} className={styles['label']}>
            Status
          </label>
          <div className={styles['checkboxGroup']}>
            <input
              id={`${ticket.id}-status`}
              type='checkbox'
              checked={ticket.completed}
              onChange={handleCompleteChange}
              className={styles['checkbox']}
            />
            <span>{ticket.completed ? 'Completed' : 'Not completed'}</span>
          </div>
        </div>

        <div className={styles['detailsSection']}>
          <label className={styles['label']}>Assign to</label>
          <select
            value={ticket.assigneeId || ''}
            onChange={handleAssignChange}
            className={styles['select']}
          >
            <option value=''>Unassigned</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {assignee && (
            <p className={styles['assignee']}>
              Currently assigned to: {assignee.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
