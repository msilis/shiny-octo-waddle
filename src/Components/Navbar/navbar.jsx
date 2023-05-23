//This is the main navigation bar that sits under the banner. Depends on 'react-router-dom' and 'react'.

import { Link, useNavigate } from "react-router-dom";
import style from "./navbar.module.css";
import { useState } from "react";

export default function Navbar({ loggedIn, setMainDisplay, setLoggedIn }) {

  //State for hamburger menu. True is hamburger open, false is closed
  const [hamburgerActive, setHamburgerActive] = useState(false);

  //Used for redirecting on navigation clicks
  const navigate = useNavigate();

  //This function sets the state of the hamburger menu, toggling it visible or hidden
  function toggleHamburger() {
    setHamburgerActive(!hamburgerActive);
  }

  //Secondary Navigation Functionality

  function handleMyGamesClick() {
    setMainDisplay("myGames");
    setHamburgerActive(false);
  }

  function handleBrowseClick() {
    setMainDisplay("browse");
    setHamburgerActive(false);
  }

  function handleAddGameClick() {
    setMainDisplay("addGame");
    setHamburgerActive(false);
  }

  function handleVoteClick() {
    setMainDisplay("vote");
    setHamburgerActive(false);
  }

  function handleLogoutClick() {
    setLoggedIn(false);
    sessionStorage.removeItem("loggedIn");
    navigate("/");
    setHamburgerActive(false)
  }

  function handleProfileClick() {
    setMainDisplay("seeProfile");
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
            <li className={style.navListItem}>Home</li>
          </Link>
          <Link
            to="about"
            className={style.navLink}
            onClick={() => setHamburgerActive(false)}
            data-testid="aboutClick"
          >
            <li className={style.navListItem}>About</li>
          </Link>
          {loggedIn ? (
            <Link
              to="/dashboard"
              className={style.navLink}
              onClick={() => {
                setMainDisplay("dashboard");
                setHamburgerActive(false);
              }}
              data-testid="dashboardClick"
            >
              <li className={style.navListItem}>Ideas</li>
            </Link>
          ) : (
            <Link
              to="/login"
              className={style.navLink}
              onClick={() => setHamburgerActive(false)}
              data-testid="loginClick"
            >
              <li className={style.navListItem}>Log In</li>
            </Link>
          )}

          <Link
            to="register"
            className={style.navLink}
            onClick={() => setHamburgerActive(false)}
            data-testid="registerClick"
          >
            <li className={style.navListItem}>Register</li>
          </Link>
          <Link
            to="/dashboard"
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
              My Games
            </li>
          </Link>
          <Link
            to="/dashboard"
            className={`${style.navLink} ${
              loggedIn
                ? style.loggedInNavigation
                : style.loggedInNavigationHidden
            }`}
            onClick={handleBrowseClick}
            data-testid="browseClick"
          >
            <li className={style.navListItem}>Browse</li>
          </Link>
          <Link
            to="/dashboard"
            className={`${style.navLink} ${
              loggedIn
                ? style.loggedInNavigation
                : style.loggedInNavigationHidden
            }`}
            onClick={handleAddGameClick}
            data-testid="addGameClick"
            
          >
            <li className={style.navListItem}>Add Game</li>
          </Link>
          <Link
            to="/dashboard"
            className={`${style.navLink} ${
              loggedIn
                ? style.loggedInNavigation
                : style.loggedInNavigationHidden
            }`}
            onClick={handleVoteClick}
            data-testid="voteClick"
          >
            <li className={style.navListItem}>Vote</li>
          </Link>
          <Link
            to="/dashboard"
            className={`${style.navLink} ${
              loggedIn
                ? style.loggedInNavigation
                : style.loggedInNavigationHidden
            }`}
            onClick={handleProfileClick}
            data-testid="profileClick"
          >
            <li className={style.navListItem}>Profile</li>
          </Link>
          <Link
            to="/"
            className={`${style.navLink} ${
              loggedIn
                ? style.loggedInNavigation
                : style.loggedInNavigationHidden
            }`}
            onClick={handleLogoutClick}
          >
            <li className={style.navListItem}>Log Out</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
