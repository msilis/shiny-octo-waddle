import { Link, useNavigate } from "react-router-dom";
import style from "./navbar.module.css";
import { useState } from "react";

export default function Navbar({ loggedIn, setMainDisplay, setLoggedIn }) {
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const navigate = useNavigate();

  function toggleHamburger() {
    setHamburgerActive(!hamburgerActive);
  }

  //Secondary Navigatin Functionality

  function handleMyGamesClick() {
    setMainDisplay("seeProfile");
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
    navigate("/login");
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
          >
            <li className={style.navListItem}>Home</li>
          </Link>
          <Link
            to="about"
            className={style.navLink}
            onClick={() => setHamburgerActive(false)}
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
            >
              <li className={style.navListItem}>Dashboard</li>
            </Link>
          ) : (
            <Link to="/login" className={style.navLink} onClick={()=> setHamburgerActive(false)}>
              <li className={style.navListItem}>Log In</li>
            </Link>
          )}

          <Link
            to="register"
            className={style.navLink}
            onClick={() => setHamburgerActive(false)}
          >
            <li className={style.navListItem}>Register</li>
          </Link>
          <Link
            to="/dashboard"
            className={style.navLink}
            onClick={handleMyGamesClick}
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
          >
            <li className={style.navListItem}>Vote</li>
          </Link>
          <Link
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
