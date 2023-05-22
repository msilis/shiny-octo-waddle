import React, { useEffect, useRef, useState, forwardRef } from "react";
import Select from "react-select";
import style from "./addGame.module.css";
import AddGameModal from "./addGameModal/addGameModal";
import {
  handleAddGame,
  handleAddVoteGame,
} from "./addGameUtils.jsx/addGameUtils";

const AddGame = forwardRef(({ setAddGame, userId, username }, ref) => {
  //Refs ***********************
  const gameName = useRef();
  const gameText = useRef();
  const container = useRef();
  //State **********************
  const [listOfPieces, setListOfPieces] = useState([]);
  const [addPieces, setAddPieces] = useState([]);
  const [gameTechniques, setGameTechniques] = useState([]);
  const [addGameTechniques, setAddGameTechniques] = useState([]);
  const [showAddGameModal, setShowAddGameModal] = useState(false);

  //Clear Button click ============================================================================================
  function handleClearClick(event) {
    setAddGame(false);
    gameName.current.value = "";
    gameText.current.value = "";
    setAddGameTechniques([]);
    setAddPieces([]);

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

  //If user selects yes, add game to vote list. If user selects no, add game only to profile.

  const handleYesClick = () => {
    if (
      gameName === "" ||
      gameText === "" ||
      addPieces.length === 0 ||
      addGameTechniques.length === 0
    ) {
      console.log("You need to check your inputs.");
    } else {
      handleAddGame(
        gameName,
        gameText,
        addGameTechniques,
        addPieces,
        userId,
        username,
        setAddGameTechniques,
        setAddPieces
      );
      handleAddVoteGame(
        gameName,
        gameText,
        addGameTechniques,
        addPieces,
        userId,
        username
      );
    }
  };

  const handleNoClick = () => {
    if (
      gameName === "" ||
      gameText === "" ||
      addPieces.length === 0 ||
      addGameTechniques.length === 0
    ) {
      console.log("You need to check your inputs.");
    } else {
      handleAddGame(
        gameName,
        gameText,
        addGameTechniques,
        addPieces,
        userId,
        username,
        setAddGameTechniques,
        setAddPieces
      );
    }
  };

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
        label="Game Name"
        ref={gameName}
        className={style.gameNameInput}
      />
      <textarea
        placeholder="Game Description"
        label="Game Description"
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
        data-id="gameOptionInput"
      />
      <Select
        options={pieceOptions}
        defaultValue={[pieceOptions[2]]}
        isMulti={true}
        className={style.addGameSelectInput}
        isSearchable={true}
        isClearable={true}
        onChange={handlePieceChange}
        value={addPieces}
        placeholder="Select Relevant Pieces"
        data-id="pieceOptionInput"
      />
      <div
        className={style.addGameViewButton}
        onClick={() =>
          handleShowModal(
            gameName,
            gameText,
            addGameTechniques,
            addPieces,
            userId,
            username,
            setAddGameTechniques,
            setAddPieces
          )
        }
        data-testid="addGameButton"
      >
        Add
      </div>
      <div className={style.addGameViewButton} onClick={handleClearClick}>
        Clear
      </div>
      <div className={style.addGameModal} data-testid="modal">
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
});

export default AddGame;
