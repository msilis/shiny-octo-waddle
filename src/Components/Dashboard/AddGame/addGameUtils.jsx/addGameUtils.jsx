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
  
    //TODO should check empty inputs here with if statement
    try {
      if (
        gameName === "" ||
        gameText === "" ||
        addPieces.length === 0 ||
        addGameTechniques.length === 0
      ) {
        console.log("You need to check your inputs.");
      } else {
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
      }
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
    username,
  ) => {

    //console logs
    console.log(gameName, gameText, "gameName and Text from addVoteGame")
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
      if (
        gameName === "" ||
        gameText === "" ||
        addPieces.length === 0 ||
        addGameTechniques.length === 0
      ) {
        console.log("You need to check your inputs.");
      } else {
        fetch("http://localhost:8080/addGameForVote", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newVoteGameData),
        }).then((response) => {
          console.log(response, "Game submitted for voting");
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  export { handleAddGame, handleAddVoteGame }