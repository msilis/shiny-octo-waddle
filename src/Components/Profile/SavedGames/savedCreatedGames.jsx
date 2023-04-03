import style from "./savedCreatedGames.module.css";
import { React, useEffect, useState } from "react";
import EditModal from "./SavedEditModal/savedEditModal";

export default function SavedCreatedGames({ userId }) {
  //State for user-created saved games
  const [savedCreatedGames, setSavedCreatedGames] = useState([]);
  const [loadingCreated, setLoadingCreated] = useState(false);
  const { loadingSaved, setLoadingSaved } = useState(false);
  const [gameToEditId, setGameToEditId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [gameToEdit, setGameToEdit] = useState("");
  const [addGameTechniques, setAddGameTechniques] = useState([]);
  const [addGamePieces, setAddGamePieces] = useState([]);

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
          console.log(jsonResponse);
          setLoadingCreated(false);
        });
    } catch (err) {
      console.log(err);
    }
  }

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
  }

  //Edit user created game =========================================

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

  console.log(gameToEditId, "gameToEditId");

  function handleEditUserCreatedGame(event) {
    const gameId = event.target.parentNode.parentNode.id;
    setGameToEditId(gameId);
    setShowModal(true);
    getUserGameToEdit(gameId);
  }

  //Get user created games with effect hook
  useEffect(() => {
    getUserCreatedGames();
  }, []);

  if (loadingCreated) {
    return <p>Loading...</p>;
  } else if (savedCreatedGames.length === 0) {
    return <p>You do not have any created games to show</p>;
  } else {
    return savedCreatedGames.map((game) => {
      return (
        <div className={style.gameItem} key={game._id} id={game._id}>
          <h5>{game.gameName}</h5>
          <p>{game.gameText}</p>
          <h5>Game focus:</h5>
          <div className={style.gameTechniqueContainer}>
            {game.gameTechnique.map((item) => {
              return <p key={item.key}>{item.label}</p>;
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
    });
  }
}
