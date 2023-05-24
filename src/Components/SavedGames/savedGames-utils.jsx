//Get a user's saved games

const getSavedGames = (
  setSavedGames,
  savedGames,
  savedGamesPagination,
  setSavedGamesPagination,
  currentMyGamesPage,
  savedGamePageSize,
  setLoadingSaved,
  userId
) => {
  return new Promise((resolve, reject) => {
    try {
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
        .then((response) => response.json())
        .then((jsonResponse) => {
          setSavedGames(jsonResponse);
          setSavedGamesPagination({
            ...savedGamesPagination,
            from: (currentMyGamesPage - 1) * savedGamePageSize,
            to:
              (currentMyGamesPage - 1) * savedGamePageSize + savedGamePageSize,
            count: savedGames.length,
          });

          setLoadingSaved(false);
          resolve(jsonResponse);
        });
    } catch (err) {
      console.log(err);
      reject(err);
    }
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
  try {
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
    ).then((games) => {
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
    });
  } catch (err) {
    console.log(err);
  }
};

export { getSavedGames, handleSavedGameDelete };
