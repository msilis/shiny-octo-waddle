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
  fetch("http://localhost:8080/getSavedGames", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(savedGameInfo),
  })
    .then((response) => {
      console.log(response, "response from utility file");
      if (!response.ok) {
        throw Error("Could not fetch data from server.");
      }
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.length === 0) {
        throw Error("Server did not return any games.");
      } else {
        console.log(jsonResponse, "jsonResponse from savedGames-utils");
        setSavedGames(jsonResponse);
        setSavedGamesPagination({
          ...savedGamesPagination,
          from: (currentMyGamesPage - 1) * savedGamePageSize,
          to: (currentMyGamesPage - 1) * savedGamePageSize + savedGamePageSize,
          count: savedGames.length,
        });
        console.log(savedGames, "from utility file");
        setLoadingSaved(false);
      }
    })
    .catch((err) => {
      console.log(err.message);
      setLoadingSaved(false);
      setSavedGameError(err.message);
    });
};

//Delete a saved game

const handleSavedGameDelete = async (
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

  const response = await fetch("http://localhost:8080/deleteSavedGame", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(deleteGameData),
  });
  const jsonResponse = await response.json();

  getSavedGames(
    setSavedGames,
    savedGames,
    savedGamesPagination,
    setSavedGamesPagination,
    currentMyGamesPage,
    savedGamePageSize,
    setLoadingSaved,
    userId
  )
    .then((games) => {
      if (!games.ok) {
        throw Error("Could not get games from server");
      }
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
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export { getSavedGames, handleSavedGameDelete };
