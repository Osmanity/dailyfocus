import { useContext, useState } from "react";
import styles from "./Signin.module.css";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../../../../context/userContext";

export const Signin = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  if (user) {
    navigate("/overview");
  }
  const [UserSignInData, setUserSignInData] = useState({
    email: "",
    password: "",
  });

  const signinUser = async (e) => {
    e.preventDefault();
    const { email, password } = UserSignInData;
    try {
      const { data } = await axios.post("/signin", {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setUserSignInData({});
        toast.success("Login Sucess!");
        setTimeout(() => {
          navigate("/overview");
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Något gick fel!");
      }
      console.log(error);
    }
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
