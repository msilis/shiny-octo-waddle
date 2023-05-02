import { useNavigate } from "react-router";
import style from "./secondaryNavigation.module.css";

export default function SecondaryNavigation({ setLoggedIn, setMainDisplay }) {
  //Import useNavigate to handle page redirect
  const navigate = useNavigate();

  //handle logout button functionality
  function handleLogoutClick() {
    setLoggedIn(false);
    sessionStorage.removeItem("loggedIn");
    navigate("/login");
  }

  //Handle 'My Games' button click
  function handleMyGamesClick() {
    setMainDisplay("myGames");
  }

  //Handle Add Game click
  function handleAddGame() {
    setMainDisplay("addGame");
  }

  //Handle Vote button click
  function handleVoteClick() {
    setMainDisplay("vote");
  }

  //Dashboard click
  function handleDashboardClick() {
    setMainDisplay("dashboard");
  }

  //Browse click
  function handleBrowseClick() {
    setMainDisplay("browse");
  }

  //Handle Profile click
  function handleProfileCLick(){
    setMainDisplay("seeProfile");
  }

  return (
    <div className={style.sidebarContainer}>
      <div className={style.sidebarButtonContainer}>
        <div className={style.sidebarButton} onClick={handleDashboardClick}>
          <span>Ideas</span>
        </div>
        <div className={style.sidebarButton} onClick={handleMyGamesClick}>
          <span>My Games</span>
        </div>
        <div className={style.sidebarButton} onClick={handleBrowseClick}>
          <span>Browse</span>
        </div>

        <div className={style.sidebarButton} onClick={handleAddGame}>
          <span>Add Game</span>
        </div>
        <div className={style.sidebarButton} onClick={handleVoteClick}>
          <span>Vote</span>
        </div>
        <div className={style.sidebarButton} onClick={handleProfileCLick}>
          <span>Profile</span>
        </div>
        <div className={style.sidebarButton} onClick={handleLogoutClick}>
          <span>Log out</span>
        </div>
      </div>
    </div>
  );
}
