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
  const [modelÖppen, setModelÖppen] = useState(false);

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

  /**Sortering - Ska kunna sorteras på (stigande och fallande):

    Repetitioner

    Prioritet */
  function SorteraRutiner(rutiner, sortera, sorteringsordning) {
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
        xvärde = PrioritetOrdning[x.Prioritet] || 0;
        yvärde = PrioritetOrdning[y.Prioritet] || 0;
      } else {
        return 0;
      }
      if (sorteringsordning === "asc") {
        return xvärde - yvärde;
      } else {
        return yvärde - xvärde;
      }
    });
    return sorteradLista;
  }

  const filtreradeRutiner = filterRutiner(rutiner, filterPrioritet);
  const sorteradeOchFiltreradeRutiner = SorteraRutiner(
    filtreradeRutiner,
    sortera,
    sorteringsordning
  );
  return (
    <>
      <div className={styles.container}>
        <div className="styles.Habits">
          <h1 className={styles.head}>Mina rutiner </h1>{" "}
          <HabitLista
            //rutiner={rutiner}
            rutiner={sorteradeOchFiltreradeRutiner}
            tarbort={TabortRutin}
            updatera={updateraRepetioner}
          />
        </div>
        <div className={styles.modelöppen}>
          <button
            className={styles.showModal}
            onClick={() => setModelÖppen(true)}
          >
            {" "}
            Skapa nya rutiner
          </button>
        </div>
      </div>
      {modelÖppen && (
        <div className={styles.formContainer}>
          <form onSubmit={läggtillRutiner} className={styles.form}>
            <input
              type="text"
              placeholder="skriv en ny rutin här"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
            />

            <div className={styles.Prioritet}>
              <label htmlFor="Prioritet">
                {" "}
                Hur många gånger vill du repetera
              </label>
            </div>
            <input
              className={styles.input}
              type="number"
              placeholder="Repetitioner"
              value={Repetitioner}
              onChange={(e) => setRepetitioner(e.target.value)}
            />
            <label htmlFor="Prioritet"> Välj Prioritet på runtinen</label>

            <div className="styles.priotet">
              <label>
                <input
                  className={styles.input}
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
                  className={styles.input}
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
                  className={styles.input}
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
            {/* sortera */}

            <div className="styles.sortera">
              <label htmlFor=""> Sortera:</label>
              <select
                value={sortera}
                onChange={(e) => setSortera(e.target.value)}
              >
                <option value="ingen">Osorterade Lista</option>
                <option value="Repetitioner">Repetitioner</option>
                <option value="Prioritet">Prioritet</option>
              </select>
              <select
                className="styles.sortering"
                value={sorteringsordning}
                onChange={(e) => setSorteringsordning(e.target.value)}
              >
                <label htmlFor=""> Sotera Fallande eller stigande : </label>
                <option value="asc">Stigande</option>
                <option value="desc">Fallande</option>
              </select>
            </div>
            <button type="submit">Spara</button>
            <button type="button" onClick={() => setModelÖppen(false)}>
              x
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Habits;
