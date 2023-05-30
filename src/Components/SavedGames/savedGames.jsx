//This component is used to display the games a user has saved from the ideas tab

import React, { useEffect, useState, useCallback } from "react";
import style from "./savedGames.module.css";
import SavedCreatedGames from "./savedCreatedGames";
import MySavedGamesPagination from "../Pagination/mySavedGamesPagination";
import { getSavedGames, handleSavedGameDelete } from "./savedGames-utils";

const savedGamePageSize = 3;

export default function SavedGames({ userId }) {
  //State for saved games
  const [savedGames, setSavedGames] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const [savedGameError, setSavedGameError] = useState(null);
  //State for pagination
  const [currentMyGamesPage, setCurrentMyGamesPage] = useState(1);
  const [savedGamesPagination, setSavedGamesPagination] = useState({
    count: 0,
    from: 0,
    to: savedGamePageSize,
  });

  console.log(savedGames, "saved Games");

  // Get user's saved games
  useEffect(() => {
    getSavedGames(
      setSavedGames,
      savedGames,
      savedGamesPagination,
      setSavedGamesPagination,
      currentMyGamesPage,
      savedGamePageSize,
      setLoadingSaved,
      userId,
      setSavedGameError
    );
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
              onClick={() =>
                handleSavedGameDelete(
                  setSavedGamesPagination,
                  savedGamesPagination,
                  currentMyGamesPage,
                  setCurrentMyGamesPage,
                  savedGamePageSize,
                  game._id,
                  setSavedGames,
                  setLoadingSaved,
                  savedGames,
                  userId
                )
              }
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
      {savedGameError ? (
        <p>There was an error getting games</p>
      ) : (
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
      )}
      <h4 className={style.savedGamesHeading}>Your Created Games:</h4>
      <div className={style.savedGamesDisplay}>
        <SavedCreatedGames userId={userId} />
      </div>
    </div>
  );
}
