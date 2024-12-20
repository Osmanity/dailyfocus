import styles from "./Habit.module.css";

function HabitLista({ rutiner, tarbort, updatera }) {
  return (
    <div className={styles.rutinCard}>
      <ul className={styles.listContainer}>
        {rutiner.map((rutin) => (
          <li key={rutin.id} className={styles.list}>
            <div className={styles.habitlistText}>
              <h2> {rutin.title} </h2> Prioritet är
              <strong> {rutin.Prioritet} </strong>, upprepas{" "}
              <strong>{rutin.Repetitioner}</strong> gånger.
            </div>
            <div className={styles.listButtons}>
              <button
                className={styles.btn}
                onClick={() => updatera(rutin.id, "Öka")}
              >
                +
              </button>
              <button
                className={styles.btn}
                onClick={() => updatera(rutin.id, "Minska")}
              >
                -{" "}
              </button>
              <button
                className={styles.btn}
                onClick={() => updatera(rutin.id, "Nollställa")}
              >
                0{" "}
              </button>
              <button className={styles.btn} onClick={() => tarbort(rutin.id)}>
                {" "}
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitLista;
