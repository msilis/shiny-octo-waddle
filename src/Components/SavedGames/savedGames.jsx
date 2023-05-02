import React, { useEffect, useState } from "react";
import style from "./savedGames.module.css";
import SavedCreatedGames from "./savedCreatedGames";

export default function SavedGames({ userId }) {
  //State for saved games
  const [savedGames, setSavedGames] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(false);

  //Function to fetch saved games

  function getSavedGames() {
    try {
      const savedGameInfo = {
        saveUser: userId,
      };
      console.log(savedGameInfo);
      setLoadingSaved(true);
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
          setLoadingSaved(false);
        });
    } catch (err) {
      console.log(err);
    }
  }

  // Get user's saved games
  useEffect(() => {
    getSavedGames();
  }, []);


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

  

  //Conditionally render game display depending on fetch state and saved games array

  function displaySavedGames() {
    if (loadingSaved) {
      return <p>Loading...</p>;
    } else if (savedGames.length === 0) {
      return <p>You do not have any saved games to show</p>;
    } else {
      return (
      savedGames.map((game) => (
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
      ))
    )}
  }


  return (
    <div className={style.savedGamesDisplayContainer}>
      <h4 className={style.savedGamesHeading}>Your saved games:</h4>
      <div className={style.savedGamesDisplay}>
        {displaySavedGames()}
      </div>
      <h4 className={style.savedGamesHeading}>Your Created Games:</h4>
      <div className={style.savedGamesDisplay}>
        <SavedCreatedGames userId={userId} />
      </div>
    </div>
  );
}
