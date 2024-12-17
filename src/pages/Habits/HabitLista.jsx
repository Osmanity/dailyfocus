import styles from "./Habit.module.css";

function HabitLista({ rutiner, tarbort }) {
  return (
    <div className={styles.rutinCard}>
      <ul className={styles.listContainer}>
        {rutiner.map((rutin) => (
          <li key={rutin.id} className={styles.list}>
            <strong> {rutin.title} </strong> Prioritet:
            <strong></strong>
            {rutin.Prioritet} <strong></strong> gör
            <strong>{rutin.Repetitioner}</strong>
            gånger.
            <button className={styles.btn} onClick={() => tarbort(rutin.id)}>
              Ta bort
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitLista;
