import style from "./navbar.module.css";

export default function Navbar(){
    return(
        <div className={style.navBackground}>
        <nav className={style.navbarContainer}>
            <ul className={style.navList}>
                <a href="/about" className={style.navLink}><li className={style.navListItem}>About</li></a>
                <a href="login" className={style.navLink}><li className={style.navListItem}>Log In</li></a>
                <a href="/register" className={style.navLink}><li className={style.navListItem}>Register</li></a>
            </ul>
        
        </nav>
        </div>
    )
}