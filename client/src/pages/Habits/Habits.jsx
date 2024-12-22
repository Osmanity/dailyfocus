import { useContext, useState } from "react";
import HabitLista from "./HabitLista";
import styles from "./Habit.module.css";
import { UserContext } from "../../../context/userContext";

function Habits() {
  // const [rutiner, setRutiner] = useState([
  //   { id: 1, title: "Träning", Repetitioner: 2, Prioritet: "hög" },
  //   { id: 3, title: "Plugga", Repetitioner: 5, Prioritet: "mellan" },
  //   { id: 4, title: "Meditera", Repetitioner: 3, Prioritet: "låg" },
  // ]);
  const { rutiner, setRutiner } = useContext(UserContext);

  //{id, title, Repetitioner, Prioritet}
  //const [rutiner, setRutiner] = useState([]);
  const [title, setTitle] = useState(" ");
  const [Prioritet, setPrioritet] = useState(" ");
  const [Repetitioner, setRepetitioner] = useState();
  const [filterPrioritet, setFilterPrioritet] = useState("");
  const [sortera, setSortera] = useState("");
  const [sorteringsordning, setSorteringsordning] = useState("");
  const [modelÖppen, setModelÖppen] = useState(false);

  function läggtillRutiner(e) {
    e.preventDefault();
    const nyRutin = {
      id: Date.now(),
      title,
      Repetitioner: Number(Repetitioner) || 0,
      Prioritet,
    };
    setRutiner([...rutiner, nyRutin]);
    setTitle(" ");
    setPrioritet(" ");
    setRepetitioner(0);
    setModelÖppen(false);
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
              Repetitioner: rutin.Repetitioner + 1,
            };
          } else if (handling === "Minska") {
            return {
              ...rutin,
              Repetitioner: Math.max(0, rutin.Repetitioner - 1),
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

  /**Sortering - Ska kunna sorteras på (stigande och fallande):

    Repetitioner

    Prioritet */
  function SorteraRutiner(rutiner, sortera, sorteringsordning) {
    //omvandlar till nummer för att lättare kunna jämföra
    const PrioritetOrdning = { låg: 1, mellan: 2, hög: 3 };
    if (sortera === "ingen" || !sortera) {
      return rutiner;
    }

    const sorteradLista = [...rutiner].sort((x, y) => {
      let xvärde, yvärde;
      if (sortera === "Repetitioner") {
        xvärde = x.Repetitioner;
        yvärde = y.Repetitioner;
      } else if (sortera === "Prioritet") {
        //hämtar in numeraska värden för Prioritet, hög:3, mellan:2 , låg:1
        xvärde = PrioritetOrdning[x.Prioritet];
        yvärde = PrioritetOrdning[y.Prioritet];
      } else {
        return 0;
      }
      // Stigande
      if (sorteringsordning === "asc") {
        return xvärde - yvärde;
        //Fallande
      } else {
        return yvärde - xvärde;
      }
    });
    return sorteradLista;
  }

  //filterade och sorterade listan
  const filtreradeRutiner = filterRutiner(rutiner, filterPrioritet);

  const sorteradeOchFiltreradeRutiner = SorteraRutiner(
    filtreradeRutiner,
    sortera,
    sorteringsordning
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Mina Rutiner</h1>
            <p className={styles.subtitle}>
              Hantera och skapa dina rutiner här
            </p>
          </div>
          <button
            className={styles.createButton}
            onClick={() => setModelÖppen(true)}
          >
            + Skapa Rutin
          </button>
        </div>

        <div className={styles.nav}>
          <div className={styles.field}>
            <label htmlFor="filterPrioritet">Prioritet:</label>
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
          <div className={styles.field}>
            <label htmlFor="sortering">Sortering:</label>
            <select
              value={sortera}
              onChange={(e) => setSortera(e.target.value)}
            >
              <option value="ingen">Osorterade Lista</option>
              <option value="Repetitioner">Repetitioner</option>
              <option value="Prioritet">Prioritet</option>
            </select>
            <select
              value={sorteringsordning}
              onChange={(e) => setSorteringsordning(e.target.value)}
            >
              <option value="asc">Stigande</option>
              <option value="desc">Fallande</option>
            </select>
          </div>
        </div>

        <HabitLista
          rutiner={sorteradeOchFiltreradeRutiner}
          tarbort={TabortRutin}
          updatera={updateraRepetioner}
        />

        {modelÖppen && (
          <div className={styles.formContainer}>
            <div className={styles.content}>
              <form onSubmit={läggtillRutiner}>
                <input
                  className={styles.option}
                  type="text"
                  placeholder="Skriv en ny rutin här"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Repetitioner:</label>
                <input
                  className={styles.option}
                  type="number"
                  placeholder="Repetitioner"
                  value={Repetitioner}
                  onChange={(e) => setRepetitioner(e.target.value)}
                />
                <label>Prioritet:</label>
                <select
                  className={styles.option}
                  value={Prioritet}
                  onChange={(e) => setPrioritet(e.target.value)}
                >
                  <option value="hög">Hög</option>
                  <option value="mellan">Mellan</option>
                  <option value="låg">Låg</option>
                </select>
                <button className={styles.btnsparaOstäng} type="submit">
                  Spara
                </button>
                <button
                  className={styles.btnsparaOstäng}
                  type="button"
                  onClick={() => setModelÖppen(false)}
                >
                  Stäng
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Habits;
