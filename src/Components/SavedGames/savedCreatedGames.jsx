//This component displays the games a user has created and saved to their profile

import style from "./savedCreatedGames.module.css";
import { React, useEffect, useState } from "react";
import EditModal from "./SavedEditModal/savedEditModal";
import MyGamesPagination from "../Pagination/MyGamesPagination";

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

  function getUserCreatedGames() {
    const createdById = {
      userId: userId,
    };
    setLoadingCreated(true);
    setSavedCreatedGameError(null);
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
      })
      .catch((err) => {
        console.log(err.message);
        setLoadingCreated(false);
        setSavedCreatedGameError(err.message);
      });
  }

  //DELETE user created game =========================================
  function handleCreatedGameDelete(event) {
    const gameId = event.target.parentNode.parentNode.id;
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
      .then((jsonResponse) => console.log(jsonResponse))
      .then(() => {
        getUserCreatedGames().then((games) => {
          setMyGamesPagination({ ...myGamesPagination, count: games.length });
        });
        if (
          currentGamesPage >
          Math.ceil(currentGamesPage.count / createdGamePageSize)
        ) {
          setCurrentGamesPage(currentGamesPage - 1);
        }
      });
  }

  //EDIT user created game =========================================

  //API Call for data
  //Call API and get game details
  function getUserGameToEdit(gameId) {
    try {
      fetch(`http://localhost:8080/getOneUserGame/${gameId}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "This is from the fetch call");
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
    getUserCreatedGames();
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
                      //! TODO This does not seem right, for this savedCreatedGames
                      //! should return an array of objects, not a regular array
                      return <p key={index}>{item.label || item}</p>;
                    })}
                  </div>
                  <div className={style.buttonContainer}>
                    <button
                      className={style.deleteSavedGameButton}
                      onClick={handleCreatedGameDelete}
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
