import { useNavigate } from "react-router";
import "./App.css";

function App() {
  const navigate = useNavigate();
  return (
    <div className="Home">
      <h1>DailyFocus</h1>
      <p>
        En app som hjälper dig hålla koll på vardagen! Planera rutiner, ärenden
        och händelser smidigt på ett ställe. Logga in och förenkla ditt liv
        idag!
      </p>

      <button
        onClick={() => {
          navigate("/signup");
        }}
      >
        Kom igång nu!
      </button>
    </div>
  );
}

export default App;
