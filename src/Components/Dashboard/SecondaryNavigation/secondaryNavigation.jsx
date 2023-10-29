import { useNavigate } from "react-router";
import style from "./secondaryNavigation.module.css";
import { BUTTON_TEXT } from "../../../Utilities/Config/ui-text";
import {
  PAGE_NAVIGATION,
  ROUTE_PATHS,
} from "../../../Utilities/Config/navigation";

export default function SecondaryNavigation({ setLoggedIn, setMainDisplay }) {
  //Import useNavigate to handle page redirect
  const navigate = useNavigate();

  //handle logout button functionality
  function handleLogoutClick() {
    setLoggedIn(false);
    sessionStorage.removeItem(STORAGE.loggedIn);
    navigate(ROUTE_PATHS.login);
  }

  //Handle 'My Games' button click
  function handleMyGamesClick() {
    setMainDisplay(PAGE_NAVIGATION.myGames);
  }

  //Handle Add Game click
  function handleAddGame() {
    setMainDisplay(PAGE_NAVIGATION.addGame);
  }

  //Handle Vote button click
  function handleVoteClick() {
    setMainDisplay(PAGE_NAVIGATION.vote);
  }

  //Dashboard click
  function handleDashboardClick() {
    setMainDisplay(PAGE_NAVIGATION.dashboard);
  }

  //Browse click
  function handleBrowseClick() {
    setMainDisplay(PAGE_NAVIGATION.browse);
  }

  //Handle Profile click
  function handleProfileCLick() {
    setMainDisplay(PAGE_NAVIGATION.profile);
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
          <span>{BUTTON_TEXT.browseButton}</span>
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
