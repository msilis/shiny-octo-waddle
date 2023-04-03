import style from "./savedEditModal.module.css";
import { React, useEffect, useRef, useState } from "react";
import Select from "react-select";

export default function EditModal({
  setGameToEditId,
  showModal,
  setShowModal,
  gameToEdit,
  setGameToEdit,
  addGameTechniques,
  setAddGameTechniques,
  addGamePieces,
  setAddGamePieces,
  gameToEditId,
  getUserCreatedGames
}) {
  //Conditionally render modal depending on state
  const modalDisplay = showModal
    ? `${style.modalVisible}`
    : `${style.modalHidden}`;
  //Refs for inputs
  const editedGameName = useRef();
  const editedGameText = useRef();
  const [listOfPieces, setListOfPieces] = useState([]);
  const [gameTechniques, setGameTechniques] = useState([]);
  const [loadingPieces, setLoadingPieces] = useState(false);
  const [loadingFocus, setLoadingFocus] = useState(false);

  //Cancel button function
  function handleCancelEditClick() {
    setGameToEditId("");
    editedGameName.current.value = gameToEdit.gameName;
    editedGameText.current.value = gameToEdit.gameText;
    setAddGameTechniques([]);
    setAddGamePieces([]);
    setGameToEdit([]);
    setShowModal(false);
  }
  console.log(gameToEdit, "Game to edit");

  //Get techniques and pieces from database
  function fetchPieces() {
    try {
      setLoadingPieces(true);
      fetch("http://localhost:8080/getPieces")
        .then((response) => response.json())
        .then((data) => {
          let sortedPieces = data.map((item) => {
            return item.pieceName;
          });
          setListOfPieces(sortedPieces);
          setLoadingPieces(false);
        });
    } catch (err) {
      console.log(err);
    }
  }

  function fetchGameTechniques() {
    try {
      setLoadingFocus(true);
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
          setLoadingFocus(false);
        });
    } catch (err) {
      console.log(err);
    }
  }

  // useEffect to get pieces and techniques for react-select

  useEffect(() => {
    fetchPieces();
    fetchGameTechniques();
  }, []);

  /* =======  Options for react-select =========*/

  //gameTechnique options

  const addTechniqueOptions = gameTechniques.map((tag, index) => {
    return {
      value: tag,
      label: tag[0].toUpperCase() + tag.substring(1),
      key: index,
    };
  });

  //Select onChange
  function handleTechniqueChange(e) {
    setAddGameTechniques(e);
  }

  function handleAddPieces(e) {
    setAddGamePieces(e);
  }

  //piecesOptions

  const piecesOptions = listOfPieces.map((piece, index) => {
    return { value: piece, label: piece, key: index };
  });

  console.log(addGameTechniques);
  console.log(addGamePieces);

  // Save edited piece to database =====================================
  function handleSaveEditedGame() {
    const saveGameData = {
      saveUser: gameToEdit.saveUser,
      gameName: editedGameName.current?.value,
      gamePieces: addGamePieces,
      gameTechnique: addGameTechniques,
      gameText: editedGameText.current?.value,
    };
    try {
      fetch(`http://localhost:8080/editCreated/${gameToEditId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveGameData),
      })
        .then((response) => response.json())
        .then((data) => console.log(data)).then(()=> getUserCreatedGames()).then(()=> setShowModal(false));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={modalDisplay}>
      <div className={style.mainModalContainer}>
        <h3>Edit your game</h3>
        <input
          defaultValue={gameToEdit.gameName}
          ref={editedGameName}
          className={style.editNameInput}
        />
        <textarea
          defaultValue={gameToEdit.gameText}
          ref={editedGameText}
          className={style.editTextInput}
        />

        <Select
          placeholder={loadingFocus ? "Loading..." : "Select focus"}
          className={style.selectComponent}
          isMulti={true}
          isSearchable={true}
          isClearable={true}
          options={addTechniqueOptions}
          onChange={handleTechniqueChange}
          value={addGameTechniques}
        />
        <Select
          placeholder={loadingPieces ? "Loading..." : "Choose pieces"}
          className={style.selectComponent}
          isMulti={true}
          isSearchable={true}
          isClearable={true}
          options={piecesOptions}
          onChange={handleAddPieces}
          value={addGamePieces}
        />
        <div className={style.buttonContainer}>
          <div className={style.saveButton} onClick={handleSaveEditedGame}>
            <span>Save</span>
          </div>
          <div className={style.cancelButton} onClick={handleCancelEditClick}>
            <span>Cancel</span>
          </div>
        </div>
      </div>
    </div>
  );
}
