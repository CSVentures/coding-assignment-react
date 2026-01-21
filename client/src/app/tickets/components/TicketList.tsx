import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTickets } from '../../context/TicketContext';
import { useFilteredTickets } from '../../hooks/useFilteredTickets';
import styles from '../tickets.module.css';
import { CreateTicketForm } from './CreateTicketForm';
import { ErrorMessage } from './ErrorMessage';
import { FilterBar } from './FilterBar';
import { LoadingSpinner } from './LoadingSpinner';
import { TicketCard } from './TicketCard';

export function TicketList() {
  const navigate = useNavigate();
  const { loading, error } = useTickets();
  const filteredTickets = useFilteredTickets();
  const [showForm, setShowForm] = useState(false);

  const handleTicketClick = (id: number) => {
    navigate(`/ticket/${id}`);
  };

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h1 className={styles['title']}>Tickets</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`${styles['button']} ${styles['buttonPrimary']}`}
        >
          {showForm ? 'Cancel' : '+ New Ticket'}
        </button>
      </div>

      {showForm && <CreateTicketForm onSuccess={() => setShowForm(false)} />}

      {error && <ErrorMessage message={error.message} />}

      <FilterBar />

      <div className={styles['listRegion']} aria-busy={loading}>
        {loading && (
          <div className={styles['loadingOverlay']}>
            <LoadingSpinner />
          </div>
        )}

        {filteredTickets.length === 0 && !loading ? (
          <p className={styles['emptyState']}>No tickets found</p>
        ) : (
          filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onClick={() => handleTicketClick(ticket.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
