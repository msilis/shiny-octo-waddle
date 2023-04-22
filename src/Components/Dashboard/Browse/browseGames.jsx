import { useEffect, useState } from "react";
import style from "./browseGames.module.css";


export default function BrowseGames() {
    
    //Array of all games from database
    const [allGames, setAllGames] = useState([]);
    const [loadingGames, setLoadingGames] = useState(false)

    function getAllGames() {
        //Get all games from database
        setLoadingGames(true);
        fetch("http://localhost:8080/gameSearch", {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            setAllGames(jsonResponse);
          })
          .catch((err) => console.log(err)).finally(()=>setLoadingGames(false));
      }
      
      useEffect(()=> {
          getAllGames();
      },[])
      
      function displayAllGames(){
        if(loadingGames){
            return <p>Loading Games...</p>
        } else {
            return(
                allGames.map((game) => (
                   <div className={style.gameItem} key={game._id} id={game._id}>
                    <h5>{game.gameName}</h5>
                    <p>{game.gameText}</p>
                   </div> 
                ))
            )
        }
      }

  return (
    <div className={style.browseGamesContainer}>
      <h2 className={style.browseHeading}>Browse Games to Play</h2>
      <div className={style.browseGamesDisplay}>
        {displayAllGames()}
      </div>
    </div>
  );
}
