import { useContext } from "react";
import { UserContext } from "../../context/userContext";

function Overview() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>
        Välkommen{" "}
        {user && user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}!
      </h1>
      <h2>Overview</h2>
    </div>
  );
}

export default Overview;
