import { useState } from "react";
import styles from "./TaskModal.module.css";

const TaskModal = ({ isOpen, closeModal, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    status: "Ej Utförd",
    beskrivning: "",
    tidsestimat: "",
    deadline: "",
    category: "Hälsa",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      status: "Ej Utförd",
      beskrivning: "",
      tidsestimat: "",
      deadline: "",
      category: "Hälsa",
    });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Skapa Nytt Ärende</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="title">Titel:</label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Titel för ditt ärende"
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Ej Utförd">Ej Utförd</option>
                <option value="Utförd">Utförd</option>
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="category">Kategori:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Hälsa">Hälsa</option>
              <option value="Hushåll">Hushåll</option>
              <option value="Jobb">Jobb</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="beskrivning">Beskrivning:</label>
            <textarea
              id="beskrivning"
              name="beskrivning"
              value={formData.beskrivning}
              onChange={handleChange}
              placeholder="Beskriv ditt ärende"
              required
            ></textarea>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="tidsestimat">Tidsestimat (h):</label>
              <input
                id="tidsestimat"
                name="tidsestimat"
                type="number"
                min="0"
                value={formData.tidsestimat}
                onChange={handleChange}
                placeholder="0"
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="deadline">Deadline:</label>
              <input
                id="deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.buttonRow}>
            <button type="submit" className={styles.saveButton}>
              Spara
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={closeModal}
            >
              Avbryt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
