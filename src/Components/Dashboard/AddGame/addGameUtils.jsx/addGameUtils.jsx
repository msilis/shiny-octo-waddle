//Add Game - not for voting

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
  //console logs
  console.log(gameName, gameText, "gameName and Text from addGame");

  const newGameData = {
    gameName: gameName.current?.value,
    gameText: gameText.current?.value,
    gameTechnique: addGameTechniques,
    gamePieces: addPieces,
    saveUser: userId,
    username: username,
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
};

export { handleAddGame, handleAddVoteGame };
