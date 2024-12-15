import { Link } from "react-router";

function Sidebar() {
  return (
    <nav className="Sidebar">
      <div className="SideBar-Top">
        <a href="/overview" className="logo">
          Daily
          {/* <br /> */}
          Focus
        </a>
      </div>
      <div className="Sidebar-center">
        <ul className="nav-links">
          <li>
            <Link to="/overview">Översikt</Link>
            {/* <a href="/overview">Översikt</a> */}
          </li>
          <li>
            <Link to="/todos">Todos</Link>
            {/* <a href="/todos">Todos</a> */}
          </li>
          <li>
            <Link to="/habits">Habits</Link>
            {/* <a href="/habits">Habits</a> */}
          </li>
          <li>
            <Link to="/events">Events</Link>
            {/* <a href="/events">Events</a> */}
          </li>
        </ul>
      </div>
      <div className="SideBar-Bottom">
        <a href="/" className="logout">
          SignOut
        </a>
      </div>
    </nav>
  );
}

export default Sidebar;
