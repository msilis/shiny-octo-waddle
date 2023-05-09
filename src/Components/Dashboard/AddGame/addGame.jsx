import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import style from "./addGame.module.css";
import AddGameModal from "./addGameModal/addGameModal";

export default function AddGame({ setAddGame, userId, username }) {
  //Refs ***********************
  const gameName = useRef();
  const gameText = useRef();
  const container = useRef();
  const piecesRef = useRef();
  //State **********************
  const [addGameTags, setAddGameTags] = useState([]);
  const [listOfPieces, setListOfPieces] = useState([]);
  const [addPieces, setAddPieces] = useState([]);
  const [gameTechniques, setGameTechniques] = useState([]);
  const [addGameTechniques, setAddGameTechniques] = useState([]);
  const [showAddGameModal, setShowAddGameModal] = useState(false);
  //Cancel Button click
  function handleCancelClick(event) {
    setAddGame(false);
  }

  // Functions to pass to useEffect ==============================================================================

  function fetchPieces() {
    fetch("http://localhost:8080/getPieces")
      .then((response) => response.json())
      .then((data) => {
        let sortedPieces = data.map((item) => {
          return item.pieceName;
        });
        //Include option to add various pieces to game
        sortedPieces.push("Various");
        sortedPieces.sort();
        setListOfPieces(sortedPieces);
      })
      .catch((err) => console.log(err));
  }

  function fetchGameTechniques() {
    try {
      fetch("http://localhost:8080/getGameTechniques", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const gameTechniqueArray = data.map((tag) => tag.gameTechnique);
          const flattedGameTechniqueArray = gameTechniqueArray.flat(1);
          const filteredGameTechniqueArray = flattedGameTechniqueArray.filter(
            (tag, index) => flattedGameTechniqueArray.indexOf(tag) === index
          );
          filteredGameTechniqueArray.sort();
          setGameTechniques(filteredGameTechniqueArray);
        });
    } catch (err) {
      console.log(err);
    }
  }
  // useEffect to get info on page load ============================================================
  useEffect(() => {
    fetchPieces();
    fetchGameTechniques();
  }, []);

  //Options to send to Select element ===============================================================
  const addGameOptions = gameTechniques.map((tag, index) => {
    return {
      value: tag,
      label: tag[0].toUpperCase() + tag.substring(1),
      key: index,
    };
  });

  //Handle tag input ================================================================================
  function handleTagChange(e) {
    const tagValues = e.map((tag) => tag.value);
    setAddGameTechniques(e);
  }

  //Assign pieces to value to send to react-select dropdown list ======================================

  const pieceOptions = listOfPieces.map((piece, index) => {
    return { value: piece, label: piece, key: index };
  });
  //Handle adding a piece to game ====================================================================
  function handlePieceChange(e) {
    const pieceValues = e.map((piece) => piece.value);
    console.log(pieceValues);
    setAddPieces(e);
  }

  //Map values of pieces and techniques to correctly send to database
  const tagValues = addGameTechniques.map((tag) => tag.value);
  const pieceValues = addPieces.map((piece) => piece.value);
  console.log(tagValues);
  console.log(pieceValues);
  console.log(username, "username")

  //Handle adding game to user's games ===============================================================
  function handleAddGame() {
    //TODO check empty inputs

    const newGameData = {
      gameName: gameName.current?.value,
      gameText: gameText.current?.value,
      gameTechnique: tagValues,
      gamePieces: pieceValues,
      saveUser: userId,
      username: username,
    };
    try {
      console.log(newGameData);
      fetch("http://localhost:8080/addGame", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newGameData),
      }).then((response) => {
        if (response.status === 201) {
          alert("Game added sucessfully");
          gameName.current.value = "";
          gameText.current.value = "";
          setAddGameTechniques([]);
          setAddPieces([]);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  function handleAddVoteGame() {
    const newVoteGameData = {
      gameName: gameName.current?.value,
      gameText: gameText.current?.value,
      gameTechnique: tagValues,
      gamePieces: pieceValues,
      saveUser: userId,
      username: username,
      yesVote: 0,
      noVote: 0,
    };
    try {
      fetch("http://localhost:8080/addGameForVote", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newVoteGameData),
      }).then((response) => {
        console.log(response, "Game submitted for voting");
      });
    } catch (err) {
      console.log(err);
    }
  }

  //If user selects yes, add game to vote list. If user selects no, add game only to profile.

  function handleYesClick() {
    handleAddGame();
    handleAddVoteGame();
  }

  function handleNoClick() {
    handleAddGame();
  }

  //Show modal and ask if user wants game added to vote list

  function handleShowModal() {
    setShowAddGameModal(true);
  }
  /* ==============================================================
|||||||||||| Return |||||||||||||||||||||||||||||||||||||||||||||
================================================================= */

  return (
    <div
      className={style.addGameContainer}
      id="addGameContainer"
      ref={container}
    >
      <h3>Add a game!</h3>
      <input
        placeholder="Game Name"
        ref={gameName}
        className={style.gameNameInput}
      />
      <textarea
        placeholder="Game Description"
        ref={gameText}
        rows="6"
        cols="75"
        className={style.gameDescriptionInput}
      />
      <Select
        options={addGameOptions}
        isMulti={true}
        className={style.addGameSelectInput}
        isSearchable={true}
        isClearable={true}
        onChange={handleTagChange}
        placeholder="Select Game Focus"
        value={addGameTechniques}
      />
      <Select
        options={pieceOptions}
        defaultValue={[pieceOptions[2]]}
        isMulti={true}
        ref={piecesRef}
        className={style.addGameSelectInput}
        isSearchable={true}
        isClearable={true}
        onChange={handlePieceChange}
        value={addPieces}
        placeholder="Select Relevant Pieces"
      />
      <div className={style.addGameViewButton} onClick={handleShowModal}>
        Add
      </div>
      <div className={style.addGameViewButton} onClick={handleCancelClick}>
        Cancel
      </div>
      <div className={style.addGameModal}>
        {showAddGameModal && (
          <AddGameModal
            showAddGameModal={showAddGameModal}
            setShowAddGameModal={setShowAddGameModal}
            handleNoClick={handleNoClick}
            handleYesClick={handleYesClick}
          />
        )}
      </div>
    </div>
  );
}
