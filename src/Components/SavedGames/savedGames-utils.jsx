//Get a user's saved games

const getSavedGames = (
  setSavedGames,
  savedGames,
  savedGamesPagination,
  setSavedGamesPagination,
  currentMyGamesPage,
  savedGamePageSize,
  setLoadingSaved,
  userId,
  setSavedGameError
) => {
  const savedGameInfo = {
    saveUser: userId,
  };
  setLoadingSaved(true);
  fetch("https://group-class-backend.onrender.com/getSavedGames", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(savedGameInfo),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error("Could not fetch data from server.");
      }
      return response.json();
    })
    .then((jsonResponse) => {
      setSavedGames(jsonResponse);
      setSavedGamesPagination({
        ...savedGamesPagination,
        from: (currentMyGamesPage - 1) * savedGamePageSize,
        to: (currentMyGamesPage - 1) * savedGamePageSize + savedGamePageSize,
        count: savedGames.length,
      });

      setLoadingSaved(false);
    })
    .catch((err) => {
      console.log(err.message);
      setLoadingSaved(false);
      setSavedGameError(err.message);
    });
};

//Delete a saved game

const handleSavedGameDelete = (
  setSavedGamesPagination,
  savedGamesPagination,
  currentMyGamesPage,
  setCurrentMyGamesPage,
  savedGamePageSize,
  gameId,
  setSavedGames,
  setLoadingSaved,
  savedGames,
  userId
) => {
  const gameToDelete = gameId;
  const deleteGameData = {
    gameToDelete: gameToDelete,
  };
  //Make API call
  fetch("https://group-class-backend.onrender.com/deleteSavedGame", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(deleteGameData),
  })
    .then((response) => response.JSON)
    .then(() => {
      getSavedGames(
        setSavedGames,
        savedGames,
        savedGamesPagination,
        setSavedGamesPagination,
        currentMyGamesPage,
        savedGamePageSize,
        setLoadingSaved,
        userId
      );
    })
    .then((getSavedResponse) => {
      if (!getSavedResponse.ok) {
        throw Error("Could not get games from server");
      } else {
        setSavedGamesPagination({
          ...savedGamesPagination,
          count: games.length,
        });
        if (
          currentMyGamesPage >
          Math.ceil(savedGamesPagination.count / savedGamePageSize)
        ) {
          setCurrentMyGamesPage(currentMyGamesPage - 1);
        }
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export { getSavedGames, handleSavedGameDelete };
