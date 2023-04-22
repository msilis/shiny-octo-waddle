import { useNavigate } from "react-router";
import style from "./dashboard-sidebar.module.css";

export default function Sidebar({
  setLoggedIn,
  setMainDisplay,
  
}) {
  //Import useNavigate to handle page redirect
  const navigate = useNavigate();

  //handle logout button functionality
  function handleLogoutClick() {
    setLoggedIn(false);
    sessionStorage.removeItem("loggedIn");
    navigate("/login");
  }

  //Handle 'My Info' button click
  function handleProfileClick() {
    setMainDisplay("seeProfile");
  }

  //Handle Add Game click
  function handleAddGame() {
    setMainDisplay("addGame");
  }

  //Handle Vote button click
  function handleVoteClick() {
    setMainDisplay("vote");
  }

  //Dashboard click
  function handleDashboardClick() {
    setMainDisplay("dashboard");
  }

  //Browse click
  function handleBrowseClick(){
    setMainDisplay("browse");
  }


  return (
    <div className={style.sidebarContainer}>
      <div className={style.sidebarButtonContainer}>
        <div className={style.sidebarButton} onClick={handleDashboardClick}>
          <span>Dashboard</span>
        </div>
        <div className={style.sidebarButton} onClick={handleProfileClick}>
          <span>My Games</span>
        </div>
        <div className={style.sidebarButton} onClick={handleBrowseClick}>
          <span>Browse</span>
        </div>

        <div className={style.sidebarButton} onClick={handleAddGame}>
          <span>Add Game</span>
        </div>
        <div className={style.sidebarButton} onClick={handleVoteClick}>
          <span>Vote</span>
        </div>
        <div className={style.sidebarButton} onClick={handleLogoutClick}>
          <span>Log out</span>
        </div>
      </div>
    </div>
  );
}
