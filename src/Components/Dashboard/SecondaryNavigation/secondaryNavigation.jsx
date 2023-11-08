import { useNavigate } from "react-router";
import style from "./secondaryNavigation.module.css";
import { BUTTON_TEXT } from "../../../Utilities/Config/ui-text";
import {
  PAGE_NAVIGATION,
  ROUTE_PATHS,
} from "../../../Utilities/Config/navigation";
import { STORAGE_OPTIONS } from "../../../Utilities/Config/storage";

export default function SecondaryNavigation({ setLoggedIn, setMainDisplay }) {
  const navigate = useNavigate();

  function handleLogoutClick() {
    if (sessionStorage.getItem(STORAGE_OPTIONS.loggedIn)) {
      setLoggedIn(false);
      sessionStorage.removeItem(STORAGE_OPTIONS.loggedIn);
      navigate(ROUTE_PATHS.login);
    }
    if (sessionStorage.getItem(STORAGE_OPTIONS.googleLogin)) {
      setLoggedIn(false);
      sessionStorage.removeItem(STORAGE_OPTIONS.googleLogin);
      sessionStorage.removeItem(STORAGE_OPTIONS.googleLoginEmail);
      sessionStorage.removeItem(STORAGE_OPTIONS.googleLoginName);
    }
  }

  function handleMyGamesClick() {
    setMainDisplay(PAGE_NAVIGATION.myGames);
  }

  function handleAddGame() {
    setMainDisplay(PAGE_NAVIGATION.addGame);
  }

  function handleVoteClick() {
    setMainDisplay(PAGE_NAVIGATION.vote);
  }

  function handleDashboardClick() {
    setMainDisplay(PAGE_NAVIGATION.dashboard);
  }

  function handleBrowseClick() {
    setMainDisplay(PAGE_NAVIGATION.browse);
  }

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
