import { Link } from "react-router-dom";
import style from "./navbar.module.css";

export default function Navbar(props) {
    console.log(props.loggedIn)
  return (
    <div className={style.navBackground}>
      <nav className={style.navbarContainer}>
        <ul className={style.navList}>
          <Link to="/" className={style.navLink}>
            <li className={style.navListItem}>Home</li>
          </Link>
          <Link to="about" className={style.navLink}>
            <li className={style.navListItem}>About</li>
          </Link>
          {props.loggedIn ? (
            <Link to="dashboard" className={style.navLink}>
              <li className={style.navListItem}>Dashboard</li>
            </Link>
          ) : (
            <Link to="/login" className={style.navLink}>
                <li className={style.navListItem}>Log In</li>
            </Link>
          )}

          <Link to="register" className={style.navLink}>
            <li className={style.navListItem}>Register</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
