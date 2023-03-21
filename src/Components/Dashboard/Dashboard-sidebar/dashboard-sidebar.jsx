import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import style from "./dashboard-sidebar.module.css";

export default function Sidebar({setLoggedIn, loggedIn, seeProfile ,setSeeProfile, setAddGame}){
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
        setAddGame(false)
    }

    //Handle Add Game click
    function handleAddGame(){
        console.log("Should show add game")
        //If profile is visible, change profile state so Add Game view shows
        if(seeProfile){
            setSeeProfile(false);
        }
        //Set state to conditionally render Add Game view
        setAddGame(true);
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
                
                <div className={style.sidebarButton} onClick={handleAddGame}>
                    <span>Add Game</span>
                </div>
                
                <div className={style.sidebarButton} onClick={handleLogoutClick}>
                    <span>Log out</span>
                </div>
            </div>
        </div>
    )
}