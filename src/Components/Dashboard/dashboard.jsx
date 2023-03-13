import style from "./dashboard.module.css";
import classnames from "classnames";
import Sidebar from "./Dashboard-sidebar/dashboard-sidebar";
import DashboardMain from "./Dashboard-main/dashboard-main";
import { useState } from "react";
import Profile from "../Profile/profile";

export default function Dashboard({ loggedIn, setLoggedIn, firstName, lastName, email, setSeeProfile, seeProfile }) {

  //State to keep track of sidebar button clicks
  
  const [addGame, setAddGame] =useState(false);

  
  function mainDisplay(){
    if (seeProfile){
      return <Profile firstName={firstName} lastName={lastName} email={email}/>
    }else {
      return <DashboardMain firstName={firstName} />
    }
    
  }

  return (
    <div className={classnames(style.dashboardContainer, style.fadeContainer)}>
      <div className={style.dashboardSidebar}>
        <Sidebar setLoggedIn={setLoggedIn} loggedIn={loggedIn} seeProfile={seeProfile} setSeeProfile={setSeeProfile} setAddGame={setAddGame}/>
      </div>
      {mainDisplay()}
    </div>
  );
}
