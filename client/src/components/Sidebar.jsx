import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

function Sidebar() {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setUser(null);
    // window.location.href = "/signin";
  };

  if (!user) return null;

  return (
    <nav className="Sidebar">
      <div className="SideBar-Top">
        <Link to="/overview" className="logo">
          Daily Focus
        </Link>
      </div>
      <div className="Sidebar-center">
        <ul className="nav-links">
          <li>
            <Link to="/overview">Översikt</Link>
          </li>
          <li>
            <Link to="/todos">Todos</Link>
          </li>
          <li>
            <Link to="/habits">Habits</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
        </ul>
      </div>
      <div className="SideBar-Bottom">
        <Link className="logout" to="/signin" onClick={handleSignOut}>
          SignOut
        </Link>
      </div>
    </nav>
  );
}

export default Sidebar;
