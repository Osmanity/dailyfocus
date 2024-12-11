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
            <a href="/overview">Översikt</a>
          </li>
          <li>
            <a href="/todos">Todos</a>
          </li>
          <li>
            <a href="/habits">Habits</a>
          </li>
          <li>
            <a href="/events">Events</a>
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
