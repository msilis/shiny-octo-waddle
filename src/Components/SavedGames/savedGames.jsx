//This component is used to display the games a user has saved from the ideas tab

import React, { useEffect, useState, useCallback } from "react";
import style from "./savedGames.module.css";
import SavedCreatedGames from "./savedCreatedGames";
import MySavedGamesPagination from "../Pagination/mySavedGamesPagination";

const savedGamePageSize = 3;

export default function SavedGames({ userId }) {
  //State for saved games
  const [savedGames, setSavedGames] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(false);
  //State for pagination
  const [currentMyGamesPage, setCurrentMyGamesPage] = useState(1);
  const [savedGamesPagination, setSavedGamesPagination] = useState({
    count: 0,
    from: 0,
    to: savedGamePageSize,
  });

  //Function to fetch saved games

  function getSavedGames() {
    return new Promise((resolve, reject) => {
      try {
        const savedGameInfo = {
          saveUser: userId,
        };
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
            setSavedGamesPagination({
              ...savedGamesPagination,
              from: (currentMyGamesPage - 1) * savedGamePageSize,
              to:
                (currentMyGamesPage - 1) * savedGamePageSize +
                savedGamePageSize,
              count: savedGames.length,
            });

            setLoadingSaved(false);
            resolve(jsonResponse);
          });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  // Get user's saved games
  useEffect(() => {
    getSavedGames();
  }, []);

  useEffect(() => {
    if (
      savedGamesPagination.from != 0 &&
      savedGamesPagination.from >= savedGames.length
    ) {
      setCurrentMyGamesPage(currentMyGamesPage - 1);
      setSavedGamesPagination({
        from: savedGamesPagination.from - 3,
        to: savedGamesPagination.to - 3,
        count: savedGames.length,
      });
    } else {
      setSavedGamesPagination({
        ...savedGamesPagination,
        count: savedGames.length,
      });
    }
  }, [
    savedGamesPagination.from,
    savedGamesPagination.to,
    savedGamesPagination.count,
    savedGames.length,
  ]);

  //DELETE a saved game

  async function handleSavedGameDelete(event) {
    const gameToDelete = event.target.parentNode.parentNode.id;
    const deleteGameData = {
      gameToDelete: gameToDelete,
    };
    try {
      const response = await fetch("http://localhost:8080/deleteSavedGame", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(deleteGameData),
      });
      const jsonResponse = await response.json();

      getSavedGames().then((games) => {
        setSavedGamesPagination({
          ...savedGamesPagination,
          count: games.length,
        });
        if (
          currentMyGamesPage >
          Math.ceil(savedGamesPagination.count / savedGamePageSize)
        ) {
          setCurrentMyGamesPage(currentMyGamesPage - 1);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  //Conditionally render game display depending on fetch state and saved games array

  function displaySavedGames() {
    if (loadingSaved) {
      return <p>Loading...</p>;
    } else if (savedGames.length === 0) {
      return <p>You do not have any saved games to show</p>;
    } else {
      return savedGames
        .slice(savedGamesPagination.from, savedGamesPagination.to)
        .map((game) => (
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
        ));
    }
  }

  return (
    <div className={style.savedGamesDisplayContainer}>
      <h4 className={style.savedGamesHeading}>Your saved games:</h4>
      <div className={style.savedGamesDisplay}>
        {displaySavedGames()}
        <div className={style.savedGamesPagination}>
          <MySavedGamesPagination
            currentMyGamesPage={currentMyGamesPage}
            setCurrentMyGamesPage={setCurrentMyGamesPage}
            savedGamesPagination={savedGamesPagination}
            setSavedGamesPagination={setSavedGamesPagination}
            savedGamePageSize={savedGamePageSize}
          />
        </div>
      </div>
      <h4 className={style.savedGamesHeading}>Your Created Games:</h4>
      <div className={style.savedGamesDisplay}>
        <SavedCreatedGames userId={userId} />
      </div>
    </div>
  );
}
