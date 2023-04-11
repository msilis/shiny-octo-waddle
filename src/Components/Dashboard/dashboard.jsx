import style from "./dashboard.module.css";
import classnames from "classnames";
import Sidebar from "./Dashboard-sidebar/dashboard-sidebar";
import { DashboardMain, Profile, AddGame, Vote } from "../../Components";
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
  setSeeProfile,
  seeProfile,
  userId,
  userToken,
}) {
  //State to keep track of sidebar button clicks

  const [addGame, setAddGame] = useState(false);
  const [seeVote, setSeeVote] = useState(false);
  //State for technique tags so it can be passed to both DashboardMain and AddGame
  const [tagArray, setTagArray] = useState([]);

  function mainDisplay() {
    if (seeProfile) {
      return (
        <Profile
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          userId={userId}
          userToken={userToken}
        />
      );
    } else if (addGame) {
      return <AddGame userId={userId} setAddGame={setAddGame} tagArray={tagArray} />;
    } else if(seeVote){
      return <Vote userId={userId}/>
    }else{
      return (
        <DashboardMain
          firstName={firstName}
          userId={userId}
          tagArray={tagArray}
          setTagArray={setTagArray}
          userToken={userToken}
        />
      );
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
          userId={userId}
          seeVote={seeVote}
          setSeeVote={setSeeVote}
        />
      </div>
      {mainDisplay()}
    </div>
  );
}
