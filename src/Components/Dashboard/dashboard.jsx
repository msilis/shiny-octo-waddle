import style from "./dashboard.module.css";
import classnames from "classnames";
import Sidebar from "./Dashboard-sidebar/dashboard-sidebar";
import { DashboardMain, Profile, AddGame, Vote, BrowseGames } from "../../Components";
import { useState } from "react";

export default function Dashboard({
  loggedIn,
  setLoggedIn,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  userId,
  username,
  mainDisplay,
  setMainDisplay,
}) {
  //State to keep track of sidebar button clickS

  const [addGame, setAddGame] = useState(false);
  //State for technique tags so it can be passed to both DashboardMain and AddGame
  const [tagArray, setTagArray] = useState([]);

  return (
    <div className={classnames(style.dashboardContainer, style.fadeContainer)}>
      <div className={style.dashboardSidebar}>
        <Sidebar
          setLoggedIn={setLoggedIn}
          loggedIn={loggedIn}
          addGame={addGame}
          userId={userId}
          mainDisplay={mainDisplay}
          setMainDisplay={setMainDisplay}
        />
      </div>
      {mainDisplay === "addGame" && (
        <AddGame userId={userId} setAddGame={setAddGame} username={username} />
      )}
      {mainDisplay === "seeProfile" && (
        <Profile
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          userId={userId}
        />
      )}
      {mainDisplay === "vote" && <Vote userId={userId} />}
      {mainDisplay === "dashboard" && (
        <DashboardMain
          firstName={firstName}
          userId={userId}
          tagArray={tagArray}
          setTagArray={setTagArray}
        />
      )}
      {mainDisplay === "browse" && <BrowseGames />}
    </div>
  );
}
