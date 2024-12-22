import { useParams, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "../../../../context/userContext";
import styles from "./Taskdetail.module.css";

const TaskDetails = () => {
  const { category, taskIndex } = useParams();
  const { tasks, setTasks } = useContext(UserContext);
  const navigate = useNavigate();
  const task = tasks[category][taskIndex];
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  if (!tasks || !tasks[category] || !tasks[category][taskIndex]) {
    return <p>Uppgiften kunde inte hittas. Kontrollera URL:en.</p>;
  }

  const handleComplete = () => {
    const updatedTasks = { ...tasks };
    updatedTasks[category][taskIndex].status = "Utförd";
    setTasks(updatedTasks);
    navigate("/todos");
  };

  const handleDelete = () => {
    const updatedTasks = { ...tasks };
    updatedTasks[category].splice(taskIndex, 1);
    setTasks(updatedTasks);
    navigate("/todos");
  };

  const handleEdit = () => {
    const updatedTasks = { ...tasks };
    updatedTasks[category][taskIndex] = editedTask;
    setTasks(updatedTasks);
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Ärendedetalj</h1>
            <p className={styles.subtitle}>Hantera din ärende här.</p>
          </div>

          <div className={styles.buttonContainer}>
            <button
              className={styles.createButton}
              onClick={() => setIsEditing(true)}
            >
              Redigera
            </button>

            <button onClick={handleDelete}>Ta bort</button>
          </div>
        </div>
        <div className={styles.taskdetailCard}>
          {isEditing ? (
            <>
              <h1 className={styles.editTitle}>Redigerade ärende:</h1>
              <form>
                <div className={styles.row}>
                  {/* Titel */}
                  <div className={styles.field}>
                    <label htmlFor="title">Titel:</label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={editedTask.title}
                      onChange={(e) =>
                        setEditedTask({ ...editedTask, title: e.target.value })
                      }
                    />
                  </div>

                  {/* Status */}
                  <div className={styles.field}>
                    <label htmlFor="status">Status:</label>
                    <select
                      id="status"
                      name="status"
                      value={editedTask.status}
                      onChange={(e) =>
                        setEditedTask({ ...editedTask, status: e.target.value })
                      }
                    >
                      <option value="Ej Utförd">Ej Utförd</option>
                      <option value="Utförd">Utförd</option>
                    </select>
                  </div>
                </div>
                {/* Beskrivning */}
                <div className={styles.field}>
                  <label htmlFor="beskrivning">Beskrivning:</label>
                  <textarea
                    id="beskrivning"
                    name="beskrivning"
                    value={editedTask.beskrivning}
                    onChange={(e) =>
                      setEditedTask({
                        ...editedTask,
                        beskrivning: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Deadline och tidsestimat */}
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="tidsestimat">Tidsestimat (h):</label>
                    <input
                      id="tidsestimat"
                      name="tidsestimat"
                      type="number"
                      min="0"
                      value={editedTask.tidsestimat}
                      onChange={(e) =>
                        setEditedTask({
                          ...editedTask,
                          tidsestimat: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="deadline">Deadline:</label>
                    <input
                      id="deadline"
                      name="deadline"
                      type="date"
                      value={editedTask.deadline}
                      onChange={(e) =>
                        setEditedTask({
                          ...editedTask,
                          deadline: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className={styles.cardActionButtons}>
                  <div className={styles.buttonContainer}>
                    <button
                      onClick={handleEdit}
                      className={styles.createButton}
                    >
                      Spara
                    </button>
                    <button
                      type="button"
                      className={styles.deleteButton}
                      onClick={() => setIsEditing(false)}
                    >
                      Avbryt
                    </button>{" "}
                  </div>
                  <div>
                    <button onClick={() => navigate("/todos")}>
                      Tillbaka till listan
                    </button>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <div>
              <h2>{task.title}</h2>
              <p>{task.beskrivning}</p>
              <p>Status: {task.status}</p>
              <p>Deadline: {task.deadline}</p>
              <p>Tidsestimat: {task.tidsestimat}</p>
              <div className={styles.buttonContainer}>
                <button onClick={handleComplete}>Markera som slutfört</button>
                <button onClick={() => navigate("/todos")}>
                  Tillbaka till listan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
