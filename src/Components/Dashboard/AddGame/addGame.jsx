import React, { useEffect, useRef, useState, forwardRef } from "react";
import Select from "react-select";
import style from "./addGame.module.css";
import AddGameModal from "./addGameModal/addGameModal";
import {
  handleAddGame,
  handleAddVoteGame,
} from "./addGameUtils.jsx/addGameUtils";
import {
  fetchGameTechniques,
  fetchPieces,
} from "./addGameUtils.jsx/addGameNetwork";
import { showErrorToast } from "../../../Utilities/toastError";
import { ERROR_MESSAGE } from "../../../Utilities/Config/ui-text";

const AddGame = forwardRef(({ setAddGame, userId, username }, ref) => {
  const gameName = useRef();
  const gameText = useRef();
  const container = useRef();

  const [listOfPieces, setListOfPieces] = useState([]);
  const [addPieces, setAddPieces] = useState([]);
  const [gameTechniques, setGameTechniques] = useState([]);
  const [addGameTechniques, setAddGameTechniques] = useState([]);
  const [showAddGameModal, setShowAddGameModal] = useState(false);

  function handleClearClick(event) {
    setAddGame(false);
    gameName.current.value = "";
    gameText.current.value = "";
    setAddGameTechniques([]);
    setAddPieces([]);
  }

  useEffect(() => {
    fetchPieces(setListOfPieces);
    fetchGameTechniques(setGameTechniques);
  }, []);

  const addGameOptions = gameTechniques.map((tag, index) => {
    return {
      value: tag,
      label: tag[0].toUpperCase() + tag.substring(1),
      key: index,
    };
  });

  function handleTagChange(e) {
    const tagValues = e.map((tag) => tag.value);
    setAddGameTechniques(e);
  }

  const pieceOptions = listOfPieces.map((piece, index) => {
    return { value: piece, label: piece, key: index };
  });

  function handlePieceChange(e) {
    const pieceValues = e.map((piece) => piece.value);
    setAddPieces(e);
  }

  const handleYesClick = () => {
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
  };

  const handleNoClick = () => {
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
  };

  const addGameProperties = {
    namePlaceholder: "Game Name",
    nameLabel: "Game Name",
    descriptionPlaceholder: "Game Description",
    descriptionLabel: "Game Description",
    textRows: "6",
    textCols: "75",
    gameSelectPlaceholder: "Select Game Focus",
    gameTechniqueSelectPlaceholder: "Select Game Technique",
  };

  function handleShowModal() {
    if (
      gameName === "" ||
      gameText === "" ||
      addPieces.length === 0 ||
      addGameTechniques.length === 0
    ) {
      showErrorToast(ERROR_MESSAGE.emptyFieldsError);
    } else {
      setShowAddGameModal(true);
    }
  }

  return (
    <div
      className={style.addGameContainer}
      id="addGameContainer"
      data-testid="add-game"
      ref={container}
    >
      <h3>Add a game!</h3>
      <input
        placeholder={addGameProperties.namePlaceholder}
        label={addGameProperties.nameLabel}
        ref={gameName}
        className={style.gameNameInput}
      />
      <textarea
        placeholder={addGameProperties.descriptionPlaceholder}
        label={addGameProperties.descriptionLabel}
        ref={gameText}
        rows={addGameProperties.textRows}
        cols={addGameProperties.textCols}
        className={style.gameDescriptionInput}
      />
      <Select
        options={addGameOptions}
        isMulti={true}
        className={style.addGameSelectInput}
        isSearchable={true}
        isClearable={true}
        onChange={handleTagChange}
        placeholder={addGameProperties.gameSelectPlaceholder}
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
        placeholder={addGameProperties.gameTechniqueSelectPlaceholder}
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
