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
  const [filterPrioritet, setFilterPrioritet] = useState("");
  const [sortera, setSortera] = useState("");
  const [sorteringsordning, setSorteringsordning] = useState("");

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

  /**
   *Man ska kunna öka, minska och nollställa repetitioner för varje rutin.
   * *You should be able to increase, decrease and reset repetitions for each routine.
   */
  function updateraRepetioner(id, handling) {
    setRutiner((rutiner) =>
      rutiner.map((rutin) => {
        if (rutin.id === id) {
          if (handling === "Öka") {
            return {
              ...rutin,
              Repetitioner: rutin.Repetitioner + 1
            };
          } else if (handling === "Minska") {
            return {
              ...rutin,
              Repetitioner: Math.max(0, rutin.Repetitioner - 1)
            };
          } else if (handling === "Nollställa") {
            return { ...rutin, Repetitioner: "" };
          }
        }

        return rutin;
      })
    );
  }

  //Filtrering - Ska kunna filtreras på prioritet.
  function filterRutiner(rutiner, filterPrioritet) {
    if (!filterPrioritet) {
      return rutiner;
    }
    return rutiner.filter((rutin) => rutin.Prioritet === filterPrioritet);
  }

  const filtreradeRutiner = filterRutiner(rutiner, filterPrioritet);

  return (
    <div className={styles.container}>
      {" "}
      <h1 className={styles.head}> Lägg till en ny rutin </h1>
      <div className={styles.rutinContainer}>
        <form onSubmit={läggtillRutiner} className={styles.form}>
          <input
            type="text"
            placeholder="skriv en ny rutin här"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=""
          />
          <label htmlFor="Prioritet"> Hur många gånger vill du repetera</label>
          <input
            type="number"
            placeholder="Repetitioner"
            value={Repetitioner}
            onChange={(e) => setRepetitioner(e.target.value)}
          />
          <label htmlFor="Prioritet"> Välj Prioritet på runtinen</label>
          {/* <select
            id="Prioritet"
            value={Prioritet}
            onChange={(e) => setPrioritet(e.target.value)}
          >
            <option value={"hög"}> Hög</option>
            <option value={"mellan"}> Mellan</option>
            <option value={"låg"}> Låg</option>
          </select> */}
          <div className="styles.priotet">
            <label>
              <input
                type="radio"
                name="Prioritet"
                value="hög"
                checked={Prioritet === "hög"}
                onChange={(e) => setPrioritet(e.target.value)}
              />
              Hög
            </label>
            <label>
              <input
                type="radio"
                name="Prioritet"
                value="mellan"
                checked={Prioritet === "mellan"}
                onChange={(e) => setPrioritet(e.target.value)}
              />
              Mellan
            </label>
            <label>
              <input
                type="radio"
                name="Prioritet"
                value="låg"
                checked={Prioritet === "låg"}
                onChange={(e) => setPrioritet(e.target.value)}
              />
              Låg
            </label>

            <div>
              <select
                id="filterPrioritet"
                value={filterPrioritet}
                onChange={(e) => setFilterPrioritet(e.target.value)}
              >
                <option value="">Alla</option>
                <option value="hög">Hög</option>
                <option value="mellan">Mellan</option>
                <option value="låg">Låg</option>
              </select>
            </div>
          </div>
          <button type="submit"> Läg till en rutin</button>
        </form>
        <HabitLista
          //rutiner={rutiner}
          rutiner={filtreradeRutiner}
          tarbort={TabortRutin}
          updatera={updateraRepetioner}
        />
      </div>
    </div>
  );
}

export default Habits;
