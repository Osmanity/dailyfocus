import styles from "./Habit.module.css";

function HabitLista({ rutiner, tabort, updatera }) {
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
            <button
              className={styles.btn}
              onClick={() => updatera(rutin.id, "Öka")}
            >
              Öka
            </button>
            <button
              className={styles.btn}
              onClick={() => updatera(rutin.id, "Minska")}
            >
              Minska{" "}
            </button>
            <button
              className={styles.btn}
              onClick={() => updatera(rutin.id, "Nollställa")}
            >
              Nollställa{" "}
            </button>
            <button className={styles.btn} onClick={() => tabort(rutin.id)}>
              Ta bort
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitLista;
