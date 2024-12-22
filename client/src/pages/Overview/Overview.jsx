import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import styles from "./Overview.module.css";
import axios from "axios";
import { Link } from "react-router";

function Overview() {
  const { user } = useContext(UserContext);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      const response = await axios.get("/greeting");
      setQuote(response.data.quote);
    };

    fetchQuote();
  }, []);

  const todos = [
    { title: "Städa köket", status: "Ej Utförd" },
    { title: "Träna yoga", status: "Ej Utförd" },
    { title: "Gå till läkaren", status: "Ej Utförd" },
  ];

  const habits = [
    { title: "Meditera", count: "5 gånger" },
    { title: "Läsa bok", count: "3 gånger" },
    { title: "Gå 10 000 steg", count: "4 gånger" },
  ];

  const events = [
    { title: "Team-möte", date: "2024-12-24" },
    { title: "Workshop", date: "2024-12-31" },
    { title: "Planeringsmöte", date: "2024-12-30" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              Välkommen{" "}
              {user &&
                user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}
              !
            </h1>
            <p className={styles.subtitle}>{quote}</p>
          </div>
        </div>
        <div className={styles.sections}>
          {/* Todos Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Todos - Ej Utförda Ärenden</h2>
            </div>
            <div className={styles.cards}>
              {todos.map((todo, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <p>{todo.title}</p>
                  </div>
                  <div className={styles.cardFooter}>
                    <p>{todo.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.containerLink}>
            <Link to="/todos" className={styles.link}>
              Visa alla ärenden
            </Link>
          </div>

          {/* Habits Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Habits - Högst Antal Repetitioner</h2>
            </div>
            <div className={styles.cards}>
              {habits.map((habit, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <p>{habit.title}</p>
                  </div>
                  <div className={styles.cardFooter}>
                    <p>{habit.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.containerLink}>
            <Link to="/habits" className={styles.link}>
              Visa alla rutiner
            </Link>
          </div>

          {/* Events Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Events - Nästkommande Händelser</h2>
            </div>
            <div className={styles.cards}>
              {events.map((event, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <p>{event.title}</p>
                  </div>
                  <div className={styles.cardFooter}>
                    <p>{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.containerLink}>
            <Link to="/events" className={styles.link}>
              Visa alla händelser
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
