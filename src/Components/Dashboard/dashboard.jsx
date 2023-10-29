import style from "./dashboard.module.css";
import classnames from "classnames";
import SecondaryNavigation from "./SecondaryNavigation/secondaryNavigation";
import {
  DashboardMain,
  Profile,
  AddGame,
  Vote,
  BrowseGames,
} from "../../Components";
import { useEffect, useState } from "react";
import MyGames from "../MyGames/myGames";
import { PAGE_NAVIGATION } from "../../Utilities/Config/navigation";

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
  //State to keep track of Secondary Navigation button clickS

  const [addGame, setAddGame] = useState(false);
  //State for technique tags so it can be passed to both DashboardMain and AddGame
  const [tagArray, setTagArray] = useState([]);

  //Get back to top of window
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classnames(style.dashboardContainer, style.fadeContainer)}>
      <div className={style.dashboardSidebar}>
        <SecondaryNavigation
          setLoggedIn={setLoggedIn}
          loggedIn={loggedIn}
          addGame={addGame}
          userId={userId}
          mainDisplay={mainDisplay}
          setMainDisplay={setMainDisplay}
        />
      </div>
      <div className={style.dashboardMainDisplay}>
        {mainDisplay === PAGE_NAVIGATION.addGame && (
          <AddGame
            userId={userId}
            setAddGame={setAddGame}
            username={username}
          />
        )}
        {mainDisplay === PAGE_NAVIGATION.myGames && <MyGames userId={userId} />}
        {mainDisplay === PAGE_NAVIGATION.vote && <Vote userId={userId} />}
        {mainDisplay === PAGE_NAVIGATION.dashboard && (
          <DashboardMain
            firstName={firstName}
            userId={userId}
            tagArray={tagArray}
            setTagArray={setTagArray}
          />
        )}
        {mainDisplay === PAGE_NAVIGATION.browse && <BrowseGames />}
        {mainDisplay === PAGE_NAVIGATION.profile && (
          <Profile
            firstName={firstName}
            lastName={lastName}
            email={email}
            userId={userId}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmail={setEmail}
          />
        )}
      </div>
    </div>
  );
}
