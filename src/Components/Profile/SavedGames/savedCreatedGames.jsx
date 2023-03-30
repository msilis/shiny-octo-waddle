import style from "./savedCreatedGames.module.css";
import { useEffect, useState } from "react";


export default function SavedCreatedGames({ userId }){
//State for user-created saved games
const [savedCreatedGames, setSavedCreatedGames] = useState([]);
const [loadingCreated, setLoadingCreated] = useState(false);


    function getUserCreatedGames() {
        const createdById = {
          userId: userId,
        };
        try {
          setLoadingCreated(true);
          fetch("http://localhost:8080/getUserCreatedGames", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(createdById),
          })
            .then((response) => response.json())
            .then((jsonResponse) => {
              setSavedCreatedGames(jsonResponse);
              setLoadingCreated(false);
            });
        } catch (err) {
          console.log(err);
        }
      };

      //Delete user created game =================================
  function handleCreatedGameDelete(event) {
    const gameId = event.target.parentNode.parentNode.id;
    console.log(gameId);
    const deleteCreatedData = {
      gameToDelete: gameId,
    };

    fetch("http://localhost:8080/deleteCreated", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(deleteCreatedData),
    })
      .then((response) => response.json())
      .then((jsonResposne) => console.log(jsonResposne))
      .then(() => {
        getUserCreatedGames();
      });
  };

//Get user created games with effect hook
      useEffect(()=>{
        getUserCreatedGames();
      },[])

      if (loadingCreated){
        return <p>Loading...</p>
      } else if (savedCreatedGames.length === 0){
        return <p>You do not have any created games to show</p>
      } else {
        return(savedCreatedGames.map((game) => {
          return (
            <div className={style.gameItem} key={game._id} id={game._id}>
              <h5>{game.gameName}</h5>
              <p>{game.gameText}</p>
              <h5>Game focus:</h5>
              <div className={style.gameTechniqueContainer}>
                {game.gameTechnique.map((item) => {
                  console.log(item.label);
                  return <p key={item.key}>{item.label}</p>;
                })}
              </div>
              <div
                className={style.deleteSavedGameButton}
                onClick={handleCreatedGameDelete}
              >
                <span>Delete</span>
              </div>
            </div>
          );
        }))
      }
}