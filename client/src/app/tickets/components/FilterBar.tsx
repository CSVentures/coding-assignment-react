import { TicketStatus } from '@acme/shared-models';
import { useTickets } from '../../context/TicketContext';
import styles from '../tickets.module.css';

export function FilterBar() {
  const { filter, setFilter } = useTickets();

  const filters: { value: TicketStatus; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' },
  ];

  return (
    <div className={styles['filterBar']}>
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={`${styles['filterButton']} ${
            filter === f.value ? styles['active'] : ''
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
