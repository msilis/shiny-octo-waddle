import { useNavigate } from "react-router";
import style from "./secondaryNavigation.module.css";
import { BUTTON_TEXT } from "../../../Utilities/Config/ui-text";

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
  function handleProfileCLick() {
    setMainDisplay("seeProfile");
  }

  return (
    <div className={style.sidebarContainer}>
      <div className={style.sidebarButtonContainer}>
        <div className={style.sidebarButton} onClick={handleDashboardClick}>
          <span>{BUTTON_TEXT.ideasButton}</span>
        </div>
        <div className={style.sidebarButton} onClick={handleMyGamesClick}>
          <span>{BUTTON_TEXT.myGamesButton}</span>
        </div>
        <div className={style.sidebarButton} onClick={handleBrowseClick}>
          <span>{BUTTON_TEXT.myGamesButton}</span>
        </div>

        <div className={style.sidebarButton} onClick={handleAddGame}>
          <span>{BUTTON_TEXT.addGameButton}</span>
        </div>
        <div className={style.sidebarButton} onClick={handleVoteClick}>
          <span>{BUTTON_TEXT.voteButton}</span>
        </div>
        <div className={style.sidebarButton} onClick={handleProfileCLick}>
          <span>{BUTTON_TEXT.profileButton}</span>
        </div>
        <div className={style.sidebarButton} onClick={handleLogoutClick}>
          <span>{BUTTON_TEXT.logOutButton}</span>
        </div>
      </div>
    </div>
  );
}
