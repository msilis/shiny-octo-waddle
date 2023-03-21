import style from "./dashboard.module.css";
import classnames from "classnames";
import Sidebar from "./Dashboard-sidebar/dashboard-sidebar";
import { DashboardMain, Profile, AddGame } from "../../Components";
import { useState } from "react";
import { Routes } from "react-router";

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
}) {
  //State to keep track of sidebar button clicks

  const [addGame, setAddGame] = useState(false);
  console.log(addGame);

  function mainDisplay() {
    /* if (seeProfile) {
      return (
        <Profile
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          userId={userId}
        />
      );
    } else if(addGame){
      return <AddGame userId={userId} setAddGame={setAddGame}/>

    } else {
      return <DashboardMain firstName={firstName} userId={userId} />;
    }
  } */

    return (
      <div
        className={classnames(style.dashboardContainer, style.fadeContainer)}
      >
        <div className={style.dashboardSidebar}>
          <Sidebar
            setLoggedIn={setLoggedIn}
            loggedIn={loggedIn}
            seeProfile={seeProfile}
            setSeeProfile={setSeeProfile}
            setAddGame={setAddGame}
          />
        </div>
        <div className={style.dashboardRouteDisplay}>
          <Routes>
            <Route
              path="/profile"
              element={
                <Profile
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  email={email}
                  setEmail={setEmail}
                  userId={userId}
                />
              }
            ></Route>
            <Route
              path="/addGame"
              element={<AddGame userId={userId} setAddGame={setAddGame} />}
            ></Route>
            <Route
              path="/mainDashboard"
              element={<DashboardMain firstName={firstName} userId={userId} />}
            ></Route>
          </Routes>
        </div>
      </div>
    );
  }
}
