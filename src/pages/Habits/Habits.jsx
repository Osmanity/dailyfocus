import { useState } from "react";
import HabitLista from "./HabitLista";
import styles from "./Habit.module.css";

/**
 *     Användaren ska kunna skapa en ny rutin och ta bort existerande rutiner.

    Varje rutin ska innehålla följande:

        Titel - t.ex “Träning, läsa bok, meditera etc.”

        Repetitioner - En siffra på hur många gånger användaren utfört rutinen.

        Prioritet - (låg,mellan,hög)
 */
/*const rutiner = [
  {
    id: 1,
    title: "Träning",
    Repetitioner: 2,
    Prioritet: "hög"
  },
  {
    id: 2,
    title: "läsa bok",
    Repetitioner: 1,
    Prioritet: "mellan"
  },
  {
    id: 3,
    title: "meditera",
    Repetitioner: 0,
    Prioritet: "låg"
  }
];*/

function Habits() {
  //{id, title, Repetitioner, Prioritet}
  const [rutiner, setRutiner] = useState([]);
  const [title, setTitle] = useState(" ");
  const [Prioritet, setPrioritet] = useState(" ");
  const [Repetitioner, setRepetitioner] = useState();

  function läggtillRutiner(e) {
    e.preventDefault();
    const nyRutin = {
      id: Date.now(),
      title,
      Repetitioner: Number(Repetitioner) || 0,
      Prioritet
    };
    setRutiner([...rutiner, nyRutin]);
    setTitle(" ");
    setPrioritet(" ");
    setRepetitioner(0);
  }

  function TabortRutin(id) {
    setRutiner(rutiner.filter((rutin) => rutin.id !== id));
  }

  return (
    <div className={styles.container}>
      {" "}
      <h1 className={styles.head}> Lägg till en ny rutin </h1>
      <div className={styles.rutinContainer}>
        <form onSubmit={läggtillRutiner} className={styles.form}>
          <label htmlFor="Prioritet"> Hur många gånger vill di repetera</label>
          <input
            type="text"
            placeholder="skriv en ny rutin här"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=""
          />
          <label htmlFor="Prioritet"> Hur många gånger vill di repetera</label>
          <input
            type="number"
            placeholder="Repetitioner"
            value={Repetitioner}
            onChange={(e) => setRepetitioner(e.target.value)}
          />
          <label htmlFor="Prioritet"> Välj Prioritet på runtinen</label>
          <select
            id="Prioritet"
            value={Prioritet}
            onChange={(e) => setPrioritet(e.target.value)}
          >
            <option value={"hög"}> Hög</option>
            <option value={"mellan"}> Mellan</option>
            <option value={"låg"}> Låg</option>
          </select>
          <button type="submit"> Läg till en rutin</button>
        </form>
        <HabitLista rutiner={rutiner} tarbort={TabortRutin} />
      </div>
    </div>
  );
}

export default Habits;
