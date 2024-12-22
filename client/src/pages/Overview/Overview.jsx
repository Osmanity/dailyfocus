import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";
import styles from "./Overview.module.css";
import axios from "axios";

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
      </div>
    </div>
  );
}

export default Overview;
