import styles from './styles.module.css';

export default function LoaderIndicator(): JSX.Element {
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Spinner} />
      </div>
    </>
  );
}
