import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import style from "./addGame.module.css";

export default function AddGame({ setAddGame, userId }) {
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
  console.log(addGameTags);
  //Cancel Button click
  function handleCancelClick(event) {
    setAddGame(false);
  }

  // Functions to pass to useEffect ==============================================================================

  function fetchPieces() {
    try {
      fetch("http://localhost:8080/getPieces")
        .then((response) => response.json())
        .then((data) => {
          let sortedPieces = data.map((item) => {
            return item.pieceName;
          });
          setListOfPieces(sortedPieces);
        });
    } catch (err) {
      console.log(err);
    }
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
    return { value: tag, label: tag[0].toUpperCase() + tag.substring(1), key: index };
  });

  //Handle tag input ================================================================================
  function handleTagChange(e) {
    console.log(e);
    setAddGameTechniques(e);
  }

  //Assign pieces to value to send to reac-select dropdown list ======================================

  const pieceOptions = listOfPieces.map((piece, index) => {
    return { value: piece, label: piece, key: index };
  });
  //Handle adding a piece to game ====================================================================
  function handlePieceChange(e) {
    console.log(e);
    setAddPieces(e);
  }

  //Handle adding game to user's games ===============================================================
  function handleAddGame() {

    //TODO check empty inputs
    const newGameData = {
      gameName: gameName.current?.value,
      gameText: gameText.current?.value,
      gameTechnique: addGameTechniques,
      gamePieces: addPieces,
      saveUser: userId,
    };
    try {
      fetch("http://localhost:8080/addGame", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newGameData),
      }).then((response) => {
        if (response.status === 201) {
          alert("Game added sucessfully");
          console.log("From inside the if check");
          gameName.current.value = "";
          gameText.current.value = "";
          setAddGameTags([]);
          setAddPieces([]);
        }
      });
    } catch (err) {
      console.log(err);
    }
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
      <input placeholder="Game Name" ref={gameName} />
      <textarea
        placeholder="Game Description"
        ref={gameText}
        rows="6"
        cols="75"
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
        isMulti={true}
        ref={piecesRef}
        className={style.addGameSelectInput}
        isSearchable={true}
        isClearable={true}
        onChange={handlePieceChange}
        value={addPieces}
        placeholder="Select Relevant Pieces"
      />
      <div className={style.addGameViewButton} onClick={handleAddGame}>
        Add
      </div>
      <div className={style.addGameViewButton} onClick={handleCancelClick}>
        Cancel
      </div>
    </div>
  );
}
