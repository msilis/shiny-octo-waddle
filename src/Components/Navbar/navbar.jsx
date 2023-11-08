import { Link, useNavigate } from "react-router-dom";
import style from "./navbar.module.css";
import { useState, useContext } from "react";
import {
  PAGE_NAVIGATION,
  ROUTE_PATHS,
} from "../../Utilities/Config/navigation";
import { BUTTON_TEXT } from "../../Utilities/Config/ui-text";
import { STORAGE_OPTIONS } from "../../Utilities/Config/storage";
import { UserContext } from "../../userContext";

export default function Navbar({ loggedIn, setMainDisplay, setLoggedIn }) {
  const [hamburgerActive, setHamburgerActive] = useState(false);

  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  function toggleHamburger() {
    setHamburgerActive(!hamburgerActive);
  }

  function handleMyGamesClick() {
    setMainDisplay(PAGE_NAVIGATION.myGames);
    setHamburgerActive(false);
  }

  function handleBrowseClick() {
    setMainDisplay(PAGE_NAVIGATION.browse);
    setHamburgerActive(false);
  }

  function handleAddGameClick() {
    setMainDisplay(PAGE_NAVIGATION.addGame);
    setHamburgerActive(false);
  }

  function handleVoteClick() {
    setMainDisplay(PAGE_NAVIGATION.vote);
    setHamburgerActive(false);
  }

  function handleLogoutClick() {
    setLoggedIn(false);
    sessionStorage.removeItem(STORAGE_OPTIONS.loggedIn);
    navigate(ROUTE_PATHS.home);
    setHamburgerActive(false);
  }

  function handleProfileClick() {
    setMainDisplay(PAGE_NAVIGATION.profile);
    setHamburgerActive(false);
  }

  return (
    <div className={style.navBackground}>
      <nav
        className={`${
          hamburgerActive ? style.navbarContainer : style.navbarContainerHide
        }`}
      >
        <div className={style.hamburgerMenu} onClick={toggleHamburger}>
          <span
            className={`${style.hamburgerLine} ${
              hamburgerActive ? style.active : ""
            }`}
          ></span>
          <span
            className={`${style.hamburgerLine} ${
              hamburgerActive ? style.active : ""
            }`}
          ></span>
          <span
            className={`${style.hamburgerLine} ${
              hamburgerActive ? style.active : ""
            }`}
          ></span>
        </div>
        <ul
          className={`${
            hamburgerActive ? style.navList : style.navListHidden
          } `}
        >
          <Link
            to="/"
            className={style.navLink}
            onClick={() => setHamburgerActive(false)}
            data-testid="homeClick"
          >
            <li className={style.navListItem}>{BUTTON_TEXT.homeButton}</li>
          </Link>
          <Link
            to="about"
            className={style.navLink}
            onClick={() => setHamburgerActive(false)}
            data-testid="aboutClick"
          >
            <li className={style.navListItem}>{BUTTON_TEXT.aboutButton}</li>
          </Link>
          {loggedIn ? (
            <Link
              to={ROUTE_PATHS.dashboard}
              className={style.navLink}
              onClick={() => {
                setMainDisplay(PAGE_NAVIGATION.dashboard);
                setHamburgerActive(false);
              }}
              data-testid="dashboardClick"
            >
              <li className={style.navListItem}>{BUTTON_TEXT.ideasButton}</li>
            </Link>
          ) : (
            <Link
              to={ROUTE_PATHS.login}
              className={style.navLink}
              onClick={() => setHamburgerActive(false)}
              data-testid="loginClick"
            >
              <li className={style.navListItem}>{BUTTON_TEXT.loginButton}</li>
            </Link>
          )}

          <Link
            to={ROUTE_PATHS.register}
            className={style.navLink}
            onClick={() => setHamburgerActive(false)}
            data-testid="registerClick"
          >
            <li className={style.navListItem}>{BUTTON_TEXT.registerButton}</li>
          </Link>
          <Link
            to={ROUTE_PATHS.dashboard}
            className={style.navLink}
            onClick={handleMyGamesClick}
            data-testid="myGamesClick"
          >
            <li
              className={`${style.navListItem} ${
                loggedIn
                  ? style.loggedInNavigation
                  : style.loggedInNavigationHidden
              }`}
            >
              {BUTTON_TEXT.myGamesButton}
            </li>
          </Link>
          <Link
            to={ROUTE_PATHS.dashboard}
            className={`${style.navLink} ${
              loggedIn
                ? style.loggedInNavigation
                : style.loggedInNavigationHidden
            }`}
            onClick={handleBrowseClick}
            data-testid="browseClick"
          >
            <li className={style.navListItem}>{BUTTON_TEXT.browseButton}</li>
          </Link>
          <Link
            to={ROUTE_PATHS.dashboard}
            className={`${style.navLink} ${
              loggedIn
                ? style.loggedInNavigation
                : style.loggedInNavigationHidden
            }`}
            onClick={handleAddGameClick}
            data-testid="addGameClick"
          >
            <li className={style.navListItem}>{BUTTON_TEXT.addGameButton}</li>
          </Link>
          <Link
            to={ROUTE_PATHS.dashboard}
            className={`${style.navLink} ${
              loggedIn
                ? style.loggedInNavigation
                : style.loggedInNavigationHidden
            }`}
            onClick={handleVoteClick}
            data-testid="voteClick"
          >
            <li className={style.navListItem}>{BUTTON_TEXT.voteButton}</li>
          </Link>
          <Link
            to={ROUTE_PATHS.dashboard}
            className={`${style.navLink} ${
              loggedIn
                ? style.loggedInNavigation
                : style.loggedInNavigationHidden
            }`}
            onClick={handleProfileClick}
            data-testid="profileClick"
          >
            <li className={style.navListItem}>{BUTTON_TEXT.profileButton}</li>
          </Link>
          <Link
            to={ROUTE_PATHS.home}
            className={`${style.navLink} ${
              loggedIn
                ? style.loggedInNavigation
                : style.loggedInNavigationHidden
            }`}
            onClick={handleLogoutClick}
          >
            <li className={style.navListItem}>{BUTTON_TEXT.logOutButton}</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
