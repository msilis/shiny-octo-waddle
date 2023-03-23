import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import style from "./addGame.module.css";

export default function AddGame({ setAddGame, tagArray, userId }) {
  const gameName = useRef();
  const gameText = useRef();
  const container = useRef();
  const techniqueRef = useRef();
  const piecesRef = useRef();
  const [addGameTags, setAddGameTags] = useState([]);
  const [listOfPieces, setListOfPieces] = useState([]);
  const [addPieces, setAddPieces] = useState([]);
  const [val, setVal] = useState([]);
  console.log(addGameTags);
  //Cancel Button click
  function handleCancelClick(event) {
    setAddGame(false);
  }

  //Options to send to Select element
  const addGameOptions = tagArray.map((tag, index) => {
    return { value: tag, label: tag, key: index };
  });

  //Handle tag input
  function handleTagChange(e) {
    console.log(e);
    setAddGameTags(e);
  }

  //Get a list of all of the Book 1 pieces to feed to Select dropdown

  useEffect(() => {
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
  }, []);
  //Assign pieces to value to send to reac-select dropdown list

  const pieceOptions = listOfPieces.map((piece, index) => {
    return { value: piece, label: piece, key: index };
  });
  //Handle adding a piece to game
  function handlePieceChange(e) {
    console.log(e);
    setAddPieces(e);
  }

  //Handle adding game to user's games
  function handleAddGame() {
    //TODO Post request to add game
    const newGameData = {
      gameName: gameName.current?.value,
      gameText: gameText.current?.value,
      gameTechnique: addGameTags,
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
          //TODO Clear inputs after sucessful submission
          alert("Game added sucessfully")
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
        placeholder="Select Techniques"
        value={addGameTags}
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
