//This component displays the games a user has created and saved to their profile

import style from "./savedCreatedGames.module.css";
import { React, useEffect, useState } from "react";
import EditModal from "./SavedEditModal/savedEditModal";
import MyGamesPagination from "../Pagination/MyGamesPagination";
import {
  getUserCreatedGames,
  handleCreatedGameDelete,
} from "./savedGames-utils";

const createdGamePageSize = 3;

export default function SavedCreatedGames({ userId }) {
  //State for user-created saved games
  const [savedCreatedGames, setSavedCreatedGames] = useState([]);
  const [loadingCreated, setLoadingCreated] = useState(false);
  const [gameToEditId, setGameToEditId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [gameToEdit, setGameToEdit] = useState("");
  const [addGameTechniques, setAddGameTechniques] = useState([]);
  const [addGamePieces, setAddGamePieces] = useState([]);
  const [savedCreatedGameError, setSavedCreatedGameError] = useState(null);
  //State for pagination
  const [currentGamesPage, setCurrentGamesPage] = useState(1);
  const [myGamesPagination, setMyGamesPagination] = useState({
    count: 0,
    from: 0,
    to: createdGamePageSize,
  });

  const createdGamesProps = {
    setLoadingCreated,
    setSavedCreatedGameError,
    setSavedCreatedGames,
    savedCreatedGames,
    userId,
    setMyGamesPagination,
    setCurrentGamesPage,
    currentGamesPage,
    myGamesPagination,
    createdGamePageSize,
  };

  //EDIT user created game =========================================

  //API Call for data
  //Call API and get game details
  function getUserGameToEdit(gameId) {
    try {
      fetch(
        `https://group-class-backend.onrender.com/getOneUserGame/${gameId}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setAddGameTechniques(data.gameTechnique);
          setAddGamePieces(data.gamePieces);
          setGameToEdit(data);
        });
    } catch (err) {
      console.log(err);
    }
  }
  //Edit User Game ===========================================
  function handleEditUserCreatedGame(event) {
    const gameId = event.target.parentNode.parentNode.id;
    setGameToEditId(gameId);
    setShowModal(true);
    getUserGameToEdit(gameId);
  }

  //Get user created games with effect hook ================
  useEffect(() => {
    getUserCreatedGames(createdGamesProps);
  }, []);

  useEffect(() => {
    if (
      myGamesPagination.from != 0 &&
      myGamesPagination.from >= savedCreatedGames.length
    ) {
      setCurrentGamesPage(currentGamesPage - 1);
      setMyGamesPagination({
        from: myGamesPagination.from - 3,
        to: myGamesPagination.to - 3,
        count: savedCreatedGames.length,
      });
    } else {
      setMyGamesPagination((prevPagination) => ({
        ...prevPagination,
        count: savedCreatedGames.length,
      }));
    }
  }, [
    savedCreatedGames.length,
    myGamesPagination.from,
    myGamesPagination.to,
    myGamesPagination.count,
  ]);

  if (loadingCreated) {
    return <p>Loading...</p>;
  } else if (savedCreatedGames.length === 0 && !savedCreatedGameError) {
    return <p>You do not have any created games to show</p>;
  } else {
    return (
      <div className={style.savedCreatedOuterContainer}>
        {savedCreatedGameError ? (
          <p>There was an error getting your created games</p>
        ) : (
          savedCreatedGames
            .slice(myGamesPagination.from, myGamesPagination.to)
            .map((game) => {
              return (
                <div className={style.gameItem} key={game._id} id={game._id}>
                  <h5>{game.gameName}</h5>
                  <p>{game.gameText}</p>
                  <h5>Game focus:</h5>
                  <div className={style.gameTechniqueContainer}>
                    {game.gameTechnique.map((item, index) => {
                      return <p key={index}>{item.label || item}</p>;
                    })}
                  </div>
                  <div className={style.buttonContainer}>
                    <button
                      className={style.deleteSavedGameButton}
                      onClick={(e) =>
                        handleCreatedGameDelete(e, createdGamesProps)
                      }
                    >
                      Delete
                    </button>
                    <button
                      className={style.editSavedGameButton}
                      onClick={handleEditUserCreatedGame}
                    >
                      Edit
                    </button>
                  </div>
                  <div className={style.modalContainer}>
                    {showModal && gameToEdit && (
                      <EditModal
                        gameToEditId={gameToEditId}
                        setGameToEditId={setGameToEditId}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        gameToEdit={gameToEdit}
                        setGameToEdit={setGameToEdit}
                        addGameTechniques={addGameTechniques}
                        setAddGameTechniques={setAddGameTechniques}
                        addGamePieces={addGamePieces}
                        setAddGamePieces={setAddGamePieces}
                        getUserCreatedGames={getUserCreatedGames}
                      />
                    )}
                  </div>
                </div>
              );
            })
        )}
        <div className={style.paginationContainer}>
          {savedCreatedGameError ? (
            ""
          ) : (
            <MyGamesPagination
              myGamesPagination={myGamesPagination}
              setMyGamesPagination={setMyGamesPagination}
              createdGamePageSize={createdGamePageSize}
              currentGamesPage={currentGamesPage}
              setCurrentGamesPage={setCurrentGamesPage}
            />
          )}
        </div>
      </div>
    );
  }
}
