//Add Game - not for voting
import { showSuccessToast } from "../../../../Utilities/toastSuccess";

const handleAddGame = (
  gameName,
  gameText,
  addGameTechniques,
  addPieces,
  userId,
  username,
  setAddGameTechniques,
  setAddPieces
) => {
  const newGameData = {
    gameName: gameName.current?.value,
    gameText: gameText.current?.value,
    gameTechnique: addGameTechniques,
    gamePieces: addPieces,
    saveUser: userId,
    username: username,
  };

  try {
    fetch("https://group-class-backend.onrender.com/addGame", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newGameData),
    }).then((response) => {
      if (response.status === 201) {
        showSuccessToast("Game added successfully!");
        setAddGameTechniques([]);
        setAddPieces([]);
        gameName.current.value = "";
        gameText.current.value = "";
      }
    });
  } catch (err) {
    console.log(err);
  }
};

//Add game for voting
const handleAddVoteGame = (
  gameName,
  gameText,
  addGameTechniques,
  addPieces,
  userId,
  username
) => {
  const newVoteGameData = {
    gameName: gameName.current?.value,
    gameText: gameText.current?.value,
    gameTechnique: addGameTechniques,
    gamePieces: addPieces,
    saveUser: userId,
    username: username,
    yesVote: 0,
    noVote: 0,
  };
  try {
    fetch("https://group-class-backend.onrender.com/addGameForVote", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newVoteGameData),
    }).then((response) => {
      console.log(response);
    });
  } catch (err) {
    console.log(err);
  }
};

export { handleAddGame, handleAddVoteGame };
