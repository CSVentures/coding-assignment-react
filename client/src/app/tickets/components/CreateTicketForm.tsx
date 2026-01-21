import { MouseEvent, KeyboardEvent, useState, ChangeEvent, useId } from 'react';
import { useTickets } from '../../context/TicketContext';
import { useFormValidation } from '../../hooks/useFormValidation';
import styles from '../tickets.module.css';

interface CreateTicketFormProps {
  onSuccess: () => void;
}

export function CreateTicketForm({ onSuccess }: CreateTicketFormProps) {
  const [description, setDescription] = useState('');
  const { createTicket, loading } = useTickets();
  const { errors, validateDescription } = useFormValidation();
  const descriptionId = useId();

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateDescription(description)) return;

    try {
      await createTicket(description);
      setDescription('');
      onSuccess();
    } catch (err) {
      // Error handled in context
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e as unknown as MouseEvent<HTMLButtonElement>);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    validateDescription(e.target.value);
  };

  return (
    <div className={styles['form']}>
      <div className={styles['formGroup']}>
        <label htmlFor={descriptionId} className={styles['label']}>Description</label>
        <input
          id={descriptionId}
          type='text'
          value={description}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder='Enter ticket description...'
          disabled={loading}
          className={`${styles['input']} ${
            errors?.['description'] ? styles['inputError'] : ''
          }`}
        />
        {errors?.['description'] && (
          <p className={styles['errorText']}>{errors?.['description']}</p>
        )}
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`${styles['button']} ${styles['buttonSuccess']} ${styles['buttonFixedWidth']}`}
      >
        {loading ? 'Creating...' : 'Create Ticket'}
      </button>
    </div>
  );
}
