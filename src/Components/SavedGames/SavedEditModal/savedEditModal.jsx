import style from "./savedEditModal.module.css";
import { React, useEffect, useRef, useState } from "react";
import Select from "react-select";
import { fetchPieces, fetchGameTechniques } from "./savedEditModal-utils";

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
  getUserCreatedGames,
}) {
  const modalDisplay = showModal
    ? `${style.modalVisible}`
    : `${style.modalHidden}`;

  const editedGameName = useRef();
  const editedGameText = useRef();
  const [listOfPieces, setListOfPieces] = useState([]);
  const [gameTechniques, setGameTechniques] = useState([]);
  const [loadingPieces, setLoadingPieces] = useState(false);
  const [loadingFocus, setLoadingFocus] = useState(false);

  function handleCancelEditClick() {
    setGameToEditId("");
    editedGameName.current.value = gameToEdit.gameName;
    editedGameText.current.value = gameToEdit.gameText;
    setAddGameTechniques([]);
    setAddGamePieces([]);
    setGameToEdit([]);
    setShowModal(false);
  }

  useEffect(() => {
    fetchPieces(setListOfPieces, setLoadingPieces);
    fetchGameTechniques(setGameTechniques, setLoadingFocus);
  }, []);

  const addTechniqueOptions = gameTechniques.map((tag, index) => {
    return {
      value: tag,
      label: tag[0].toUpperCase() + tag.substring(1),
      key: index,
    };
  });

  function handleTechniqueChange(e) {
    setAddGameTechniques(e);
  }

  function handleAddPieces(e) {
    setAddGamePieces(e);
  }

  const piecesOptions = listOfPieces.map((piece, index) => {
    return { value: piece, label: piece, key: index };
  });

  function handleSaveEditedGame() {
    const saveGameData = {
      saveUser: gameToEdit.saveUser,
      gameName: editedGameName.current?.value,
      gamePieces: addGamePieces,
      gameTechnique: addGameTechniques,
      gameText: editedGameText.current?.value,
    };
    try {
      fetch(
        `https://group-class-backend.onrender.com/editCreated/${gameToEditId}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveGameData),
        }
      )
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then(() => getUserCreatedGames())
        .then(() => setShowModal(false));
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
