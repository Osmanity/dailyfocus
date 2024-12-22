import { useContext, useState } from "react";
import styles from "./Todos.module.css";
import TaskModal from "../../components/Todos/TaskModal";
import { UserContext } from "../../../context/userContext";

const Todos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [tasks, setTasks] = useState({
  //   Hälsa: [],
  //   Hushåll: [],
  //   Jobb: [],
  // });

  // const [tasks, setTasks] = useState({
  //   Hälsa: [
  //     {
  //       title: "Träna yoga",
  //       status: "Ej Utförd",
  //       beskrivning: "Gör en 30-minuters yogasession.",
  //       tidsestimat: "0.5",
  //       deadline: "2024-12-31",
  //     },
  //     {
  //       title: "Gå till läkaren",
  //       status: "Utförd",
  //       beskrivning: "Årlig hälsokontroll.",
  //       tidsestimat: "1",
  //       deadline: "2024-12-15",
  //     },
  //     {
  //       title: "Ta en promenad",
  //       status: "Ej Utförd",
  //       beskrivning: "Gå 5 km i parken.",
  //       tidsestimat: "1",
  //       deadline: "2024-12-25",
  //     },
  //     {
  //       title: "Meditera",
  //       status: "Utförd",
  //       beskrivning: "10-minuters mindfulness-session.",
  //       tidsestimat: "0.2",
  //       deadline: "2024-12-20",
  //     },
  //   ],
  //   Hushåll: [
  //     {
  //       title: "Städa köket",
  //       status: "Ej Utförd",
  //       beskrivning: "Disk och rengör alla ytor.",
  //       tidsestimat: "0.75",
  //       deadline: "2024-12-22",
  //     },
  //     {
  //       title: "Handla mat",
  //       status: "Utförd",
  //       beskrivning: "Köp ingredienser för veckan.",
  //       tidsestimat: "1",
  //       deadline: "2024-12-20",
  //     },
  //     {
  //       title: "Tvätta kläder",
  //       status: "Ej Utförd",
  //       beskrivning: "Tvätta och vik tvätt.",
  //       tidsestimat: "2",
  //       deadline: "2024-12-23",
  //     },
  //     {
  //       title: "Rensa garderoben",
  //       status: "Utförd",
  //       beskrivning: "Sortera kläder och donera det som inte används.",
  //       tidsestimat: "3",
  //       deadline: "2024-12-18",
  //     },
  //   ],
  //   Jobb: [
  //     {
  //       title: "Skicka rapport",
  //       status: "Ej Utförd",
  //       beskrivning: "Slutför och skicka Q4-rapporten.",
  //       tidsestimat: "2",
  //       deadline: "2024-12-23",
  //     },
  //     {
  //       title: "Delta i teammöte",
  //       status: "Utförd",
  //       beskrivning: "Veckomöte med teamet.",
  //       tidsestimat: "1",
  //       deadline: "2024-12-19",
  //     },
  //     {
  //       title: "Följ upp med klient",
  //       status: "Ej Utförd",
  //       beskrivning: "Skicka uppföljningsmail till klienten.",
  //       tidsestimat: "0.5",
  //       deadline: "2024-12-22",
  //     },
  //   ],
  // });
  const { tasks, setTasks } = useContext(UserContext);

  console.log(tasks);

  const [filteredCategory, setFilteredCategory] = useState("Alla");
  const [filteredStatus, setFilteredStatus] = useState("Alla");
  const [sortOrder, setSortOrder] = useState({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (formData) => {
    const { category, ...newTask } = formData;

    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: [...prevTasks[category], newTask],
    }));

    closeModal();
  };

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    if (id === "kategorier") setFilteredCategory(value);
    if (id === "status") setFilteredStatus(value);
  };

  const handleSortChange = (category, criteria) => {
    if (criteria === "Alla") return;

    setSortOrder((prevSortOrder) => {
      const newSortOrder = {
        ...prevSortOrder,
        [category]: prevSortOrder[category] === "asc" ? "desc" : "asc",
      };

      setTasks((prevTasks) => ({
        ...prevTasks,
        [category]: [...prevTasks[category]].sort((a, b) => {
          let aValue = a[criteria] ?? "";
          let bValue = b[criteria] ?? "";

          if (criteria === "tidsestimat") {
            aValue = parseFloat(aValue);
            bValue = parseFloat(bValue);
          }

          if (newSortOrder[category] === "asc") {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        }),
      }));

      return newSortOrder;
    });
  };

  const filteredTasks = Object.keys(tasks).reduce((result, category) => {
    if (filteredCategory !== "Alla" && filteredCategory !== category) {
      return result;
    }

    const filteredCategoryTasks = tasks[category].filter((task) => {
      if (filteredStatus === "Alla") return true;
      return task.status === filteredStatus;
    });

    if (filteredCategoryTasks.length > 0) {
      result[category] = filteredCategoryTasks;
    }

    return result;
  }, {});

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Mina Ärenden</h1>
            <p className={styles.subtitle}>
              Hantera och skapa dina ärenden här
            </p>
          </div>
          <button className={styles.createButton} onClick={openModal}>
            + Skapa Ärende
          </button>
        </div>

        <TaskModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          onSubmit={handleSubmit}
        />

        <div className={styles.filterHeader}>
          <div className={styles.field}>
            <label htmlFor="status">Status:</label>
            <select id="status" onChange={handleFilterChange}>
              <option value="Alla">Alla</option>
              <option value="Ej Utförd">Ej Utförd</option>
              <option value="Utförd">Utförd</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="kategorier">Kategorier:</label>
            <select id="kategorier" onChange={handleFilterChange}>
              <option value="Alla">Alla</option>
              <option value="Hälsa">Hälsa</option>
              <option value="Hushåll">Hushåll</option>
              <option value="Jobb">Jobb</option>
            </select>
          </div>
        </div>

        <div className={styles.taskListMainContainer}>
          {Object.keys(filteredTasks).map((category) => (
            <div key={category} className={styles.taskListContainer}>
              <h1 className={styles.taskListTitle}>{category}</h1>

              <div className={styles.taskList}>
                <div className={styles.taskSorter}>
                  <div className={styles.field}>
                    <div
                      className={styles.logoSorting}
                      onClick={() => handleSortChange(category, "title")}
                    >
                      {sortOrder[category] === "asc" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="#000000"
                          viewBox="0 0 256 256"
                        >
                          <path d="M40,128a8,8,0,0,1,8-8h72a8,8,0,0,1,0,16H48A8,8,0,0,1,40,128Zm8-56h56a8,8,0,0,0,0-16H48a8,8,0,0,0,0,16ZM184,184H48a8,8,0,0,0,0,16H184a8,8,0,0,0,0-16ZM229.66,82.34l-40-40a8,8,0,0,0-11.32,0l-40,40a8,8,0,0,0,11.32,11.32L176,67.31V144a8,8,0,0,0,16,0V67.31l26.34,26.35a8,8,0,0,0,11.32-11.32Z"></path>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="#000000"
                          viewBox="0 0 256 256"
                        >
                          <path d="M128,128a8,8,0,0,1-8,8H48a8,8,0,0,1,0-16h72A8,8,0,0,1,128,128ZM48,72H184a8,8,0,0,0,0-16H48a8,8,0,0,0,0,16Zm56,112H48a8,8,0,0,0,0,16h56a8,8,0,0,0,0-16Zm125.66-21.66a8,8,0,0,0-11.32,0L192,188.69V112a8,8,0,0,0-16,0v76.69l-26.34-26.35a8,8,0,0,0-11.32,11.32l40,40a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,229.66,162.34Z"></path>
                        </svg>
                      )}
                    </div>
                    <select
                      id="taskSorter"
                      defaultValue="Alla" // Sätt "Alla" som standard
                      onChange={(e) =>
                        handleSortChange(category, e.target.value)
                      }
                    >
                      <option value="Alla">Alla</option>
                      <option value="status">Status</option>
                      <option value="tidsestimat">Tidsestimat</option>
                      <option value="deadline">Deadline</option>
                    </select>
                  </div>
                </div>
                {filteredTasks[category].length > 0 ? (
                  filteredTasks[category].map((task, index) => (
                    <div key={index} className={styles.task}>
                      <div className={styles.taskHeader}>
                        <p>{task.title}</p>
                        <p>{task.status}</p>
                      </div>
                      <div className={styles.beskrivning}>
                        <p>{task.beskrivning}</p>
                      </div>
                      <div className={styles.taskFooter}>
                        <div className={styles.tidsestimat}>
                          <p>{task.tidsestimat}</p>
                        </div>
                        <div className={styles.deadline}>
                          <p>{task.deadline}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.noTasks}>Inga ärenden tillagda</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todos;
