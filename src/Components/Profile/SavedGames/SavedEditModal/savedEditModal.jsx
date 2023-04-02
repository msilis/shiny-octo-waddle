import style from "./savedEditModal.module.css";
import { React, useEffect, useRef, useState } from "react";
import Select from "react-select";

export default function EditModal({
  setGameToEditId,
  showModal,
  setShowModal,
  gameToEdit,
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
  const [addGameTechniques, setAddGameTechniques] = useState(gameToEdit.gameTechnique);
  const [defaultTechniques, setDefaultTechniques] = useState([]);
  const [addGamePieces, setAddGamePieces] = useState([]);
  console.log(addGameTechniques);

  //Cancel button function
  function handleCancelEditClick() {
    setGameToEditId("");
    editedGameName.current.value = gameToEdit.gameName;
    editedGameText.current.value = gameToEdit.gameText;
    setAddGameTechniques([]);
    setAddGamePieces([]);
    setShowModal(false);
  }
  console.log(gameToEdit, "Game to edit");

  //Get techniques and pieces from database
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

  function handleAddPieces(e){
    setAddGamePieces(e)
  }

  //piecesOptions

  const piecesOptions = listOfPieces.map((piece, index) => {
    return { value: piece, label: piece, key: index };
  });

  console.log(gameToEdit.gameTechnique);
  console.log(gameToEdit.gamePieces)
  console.log(defaultTechniques)
  console.log(addTechniqueOptions[1])

  //default value for pieces

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

        {/* //TODO! Select not displaying default values */}
        <Select
          placeholder="Select focus"
          className={style.selectComponent}
          isMulti={true}
          isSearchable={true}
          isClearable={true}
          options={addTechniqueOptions}
          onChange={handleTechniqueChange}
          value={addGameTechniques}
          
          
        />
        <Select
          placeholder="Relevant Pieces"
          className={style.selectComponent}
          isMulti={true}
          isSearchable={true}
          isClearable={true}
          options={piecesOptions}
          value={addGamePieces}
          onChange={handleAddPieces}
          defaultValue={[gameToEdit.gamePieces]}
          
        />
        <div className={style.buttonContainer}>
          <div className={style.saveButton}>
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
