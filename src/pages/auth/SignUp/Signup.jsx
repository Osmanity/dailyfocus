import { useState } from "react";
import styles from "./Signup.module.css";
import { Link } from "react-router";

export const Signup = () => {
  const [UserSignUpData, setUserSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signupUser = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.signup}>
      <h1>SignUp</h1>
      <form className={styles.signup_form} onSubmit={signupUser}>
        <div className={styles.form_input}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Brandon"
            value={UserSignUpData.name}
            onChange={(e) =>
              setUserSignUpData({ ...UserSignUpData, name: e.target.value })
            }
          />
        </div>
        <div className={styles.form_input}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Brandon@nackadmin.se"
            value={UserSignUpData.email}
            onChange={(e) =>
              setUserSignUpData({ ...UserSignUpData, email: e.target.value })
            }
          />
        </div>
        <div className={styles.form_input}>
          <label>Password</label>
          <input
            type="password"
            placeholder="**********"
            value={UserSignUpData.password}
            onChange={(e) =>
              setUserSignUpData({ ...UserSignUpData, password: e.target.value })
            }
          />
        </div>
        <p className={styles.SignInText}>
          Om du redan har ett konto, <Link to="/signin">logga in här</Link>
        </p>
        <button className={styles.submit_button} type="submit">
          Skapa Konto
        </button>
      </form>
    </div>
  );
};
