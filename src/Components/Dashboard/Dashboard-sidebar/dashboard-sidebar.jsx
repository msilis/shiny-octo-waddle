import { useNavigate } from "react-router";
import style from "./dashboard-sidebar.module.css";

export default function Sidebar({setLoggedIn, loggedIn, seeProfile ,setSeeProfile}){
    //Import useNavigate to handle page redirect
    const navigate = useNavigate()

    //handle logout button functionality
    function handleLogoutClick(){
        setLoggedIn(false)
        sessionStorage.removeItem("loggedIn")
        navigate("/login")
    };

    //Handle 'My Info' button click
    function handleProfileClick(){
        setSeeProfile(true);
    }

    //Handle 'My Info' button click if profile visible
    function handleProfileVisibleClick(){
        setSeeProfile(false);
    }

    //Conditional rendering of info button
    const infoButtonText = seeProfile ? "Dashboard" : "My Info";
    const infoButtonFunction = seeProfile ? handleProfileVisibleClick : handleProfileClick;


    return(
        <div className={style.sidebarContainer}>
            <div className={style.sidebarButtonContainer}>
                <div className={style.sidebarButton} onClick={infoButtonFunction}>
                    <span>{infoButtonText}</span>
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