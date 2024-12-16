import { useState } from "react";
import styles from "./Signin.module.css";
import { Link } from "react-router";
import axios from "axios";

export const Signin = () => {
  const [UserSignInData, setUserSignInData] = useState({
    email: "",
    password: "",
  });

  const signinUser = (e) => {
    e.preventDefault();
    axios.get("/");
  };

  return (
    <div className={styles.signin}>
      <h1>SignIn</h1>
      <form className={styles.signin_form} onSubmit={signinUser}>
        <div className={styles.form_input}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Brandon@nackadmin.se"
            value={UserSignInData.email}
            onChange={(e) =>
              setUserSignInData({ ...UserSignInData, email: e.target.value })
            }
          />
        </div>
        <div className={styles.form_input}>
          <label>Password</label>
          <input
            type="password"
            placeholder="**********"
            value={UserSignInData.password}
            onChange={(e) =>
              setUserSignInData({ ...UserSignInData, password: e.target.value })
            }
          />
        </div>
        <p className={styles.SignUpText}>
          Om du inte har ett konto än, <Link to="/signup">skapa ett här</Link>
        </p>
        <button className={styles.submit_button} type="submit">
          Logga In
        </button>
      </form>
    </div>
  );
};
