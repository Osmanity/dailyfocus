import styles from "./Habit.module.css";

function HabitLista({ rutiner, tarbort, updatera }) {
  return (
    <div className={styles.rutinListMainContainer}>
      {rutiner.length > 0 ? (
        rutiner.map((rutin) => (
          <div key={rutin.id} className={styles.rutinListContainer}>
            <div className={styles.rutiner}>
              <div className={styles.rutinerHeader}>
                <h3>{rutin.title}</h3>
                <p>
                  Prioritet: <strong>{rutin.Prioritet}</strong>
                </p>
              </div>
              <div className={styles.beskrivning}>
                Upprepas <strong>{rutin.Repetitioner}</strong> gånger.
              </div>
              <div className={styles.rutinFooter}>
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
                  -
                </button>
                <button
                  className={styles.btn}
                  onClick={() => updatera(rutin.id, "Nollställa")}
                >
                  0
                </button>
                <button
                  className={styles.btn}
                  onClick={() => tarbort(rutin.id)}
                >
                  Ta bort
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.ingarutin}>Inga rutiner tillagda</p>
      )}
    </div>
  );
}

export default HabitLista;
