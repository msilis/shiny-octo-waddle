import { useEffect, useState } from "react";
import style from "./savedGames.module.css";

export default function SavedGames({ userId }) {
  //State for saved games
  const [savedGames, setSavedGames] = useState([]);
  const [savedCreatedGames, setSavedCreatedGames] = useState([]);

  //Function to fetch saved games

  function getSavedGames() {
    try {
      const savedGameInfo = {
        saveUser: userId,
      };
      console.log(savedGameInfo);
      fetch("http://localhost:8080/getSavedGames", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(savedGameInfo),
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          setSavedGames(jsonResponse);
        });
    } catch (err) {
      console.log(err);
    }
  }

  //Function to get games created by user

  function getUserCreatedGames() {
    const createdById = {
      userId: userId,
    };
    try {
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
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getSavedGames();
    getUserCreatedGames();
  }, []);

  console.log(savedCreatedGames);

  function handleSavedGameDelete(event) {
    const gameToDelete = event.target.parentNode.parentNode.id;
    const deleteGameData = {
      gameToDelete: gameToDelete,
    };
    fetch("http://localhost:8080/deleteSavedGame", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(deleteGameData),
    })
      .then((response) => response.json())
      .then((jsonResponse) => console.log(jsonResponse))
      .then(() => {
        getSavedGames();
      });
  }

  //Delete user created game =================================
  function handleCreatedGameDelete(event){
    //TODO Something is not working here
    const gameId = event.target.parentNode.parentNode.id;
    console.log(gameId)
    const deleteCreatedData = {
      gameToDelete: gameId
    }

    fetch("http://localhost:8080/deleteCreated", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(deleteCreatedData)
    }).then(response => response.json()).then(jsonResposne => console.log(jsonResposne)).then(()=>{
      getUserCreatedGames()
    })
  }

  return (
    <div className={style.savedGamesDisplayContainer}>
      <h4 className={style.savedGamesHeading}>Your saved games:</h4>
      <div className={style.savedGamesDisplay}>
        {savedGames.map((game) => (
          <div className={style.gameItem} key={game._id} id={game._id}>
            <h5>{game.gameName}</h5>
            <p>{game.gameText}</p>
            <div
              className={style.deleteSavedGameButton}
              onClick={handleSavedGameDelete}
            >
              <span>Delete</span>
            </div>
          </div>
        ))}
      </div>
      <h4 className={style.savedGamesHeading}>Your Created Games:</h4>
      <div className={style.savedGamesDisplay}>
        {savedCreatedGames.length === 0 ? (
          <p>You do not have any created games to show</p>
        ) : (
          savedCreatedGames.map((game) => {
            console.log(game.gameName);
            return (<div className={style.gameItem} key={game._id} id={game._id}>
              <h5>{game.gameName}</h5>
              <p>{game.gameText}</p>
              <div
              className={style.deleteSavedGameButton}
              onClick={handleCreatedGameDelete}>
              <span>Delete</span>
            </div>
            </div>);
          })
        )}
      </div>
    </div>
  );
}
