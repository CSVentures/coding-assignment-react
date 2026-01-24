import { ChangeEvent, FormEvent, useId, useState } from 'react';
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
  const errorId = useId();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    validateDescription(e.target.value);
  };

  const hasError = !!errors?.['description'];

  return (
    <form onSubmit={handleSubmit} className={styles['form']} noValidate>
      <fieldset disabled={loading} className={styles['fieldset']}>
        <div className={styles['formGroup']}>
          <label htmlFor={descriptionId} className={styles['label']}>
            Description
            <span className={styles['srOnly']}>required</span>
            <span aria-hidden='true'>*</span>
          </label>
          <input
            id={descriptionId}
            type='text'
            value={description}
            onChange={handleChange}
            placeholder='Enter ticket description...'
            required
            aria-required='true'
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={`${styles['input']} ${
              hasError ? styles['inputError'] : ''
            }`}
          />
          {hasError && (
            <p id={errorId} className={styles['errorText']} role='alert'>
              {errors['description']}
            </p>
          )}
        </div>
        <button
          type='submit'
          className={`${styles['button']} ${styles['buttonSuccess']} ${styles['buttonFixedWidth']}`}
          aria-busy={loading}
          aria-label='Create Ticket'
        >
          {loading ? 'Creating...' : 'Create Ticket'}
        </button>
      </fieldset>
    </form>
  );
}
