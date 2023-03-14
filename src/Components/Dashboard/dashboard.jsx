import style from "./dashboard.module.css";
import classnames from "classnames";
import Sidebar from "./Dashboard-sidebar/dashboard-sidebar";
import { DashboardMain, Profile } from "../../Components";
import { useState } from "react";

export default function Dashboard({
  loggedIn,
  setLoggedIn,
  firstName,
  lastName,
  email,
  setSeeProfile,
  seeProfile,
  userId,
}) {
  //State to keep track of sidebar button clicks

  const [addGame, setAddGame] = useState(false);

  function mainDisplay() {
    if (seeProfile) {
      return (
        <Profile
          firstName={firstName}
          lastName={lastName}
          email={email}
          userId={userId}
        />
      );
    } else {
      return <DashboardMain firstName={firstName} userId={userId} />;
    }
  }

  return (
    <div className={classnames(style.dashboardContainer, style.fadeContainer)}>
      <div className={style.dashboardSidebar}>
        <Sidebar
          setLoggedIn={setLoggedIn}
          loggedIn={loggedIn}
          seeProfile={seeProfile}
          setSeeProfile={setSeeProfile}
          setAddGame={setAddGame}
        />
      </div>
      {mainDisplay()}
    </div>
  );
}
