import { useNavigate } from "react-router";
import style from "./dashboard-sidebar.module.css";

export default function Sidebar({setLoggedIn, loggedIn}){
    //Import useNavigate to handle page redirect
    const navigate = useNavigate()

    //handle logout button functionality
    function handleLogoutClick(){
        setLoggedIn(false)
        sessionStorage.removeItem("loggedIn")
        navigate("/login")
    }


    return(
        <div className={style.sidebarContainer}>
            <div className={style.sidebarButtonContainer}>
                <div className={style.sidebarButton}>
                    <span>My Info</span>
                </div>
                <div className={style.sidebarButton}>
                    <span>Add Game</span>
                </div>
                <div className={style.sidebarButton} onClick={handleLogoutClick}>
                    <span>Log out</span>
                </div>
            </div>
        </div>
    )
}