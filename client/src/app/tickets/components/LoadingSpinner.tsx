import styles from '../tickets.module.css';

export function LoadingSpinner() {
  return (
    <div className={styles['spinner']}>
      <div className={styles['spinnerIcon']} />
    </div>
  );
}
