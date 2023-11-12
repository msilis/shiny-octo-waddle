//Get a user's saved games

import { API_URL } from "../../Utilities/Config/api";

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
  fetch(`${API_URL.getSavedGames}`, {
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

  fetch(`${API_URL.deleteSavedGame}`, {
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

function getUserCreatedGames(createdGamesProps) {
  const createdById = {
    userId: createdGamesProps.userId,
  };

  createdGamesProps.setLoadingCreated(true);
  createdGamesProps.setSavedCreatedGameError(null);
  fetch(`${API_URL.getUserCreatedGames}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(createdById),
  })
    .then((response) => response.json())
    .then((jsonResponse) => {
      createdGamesProps.setSavedCreatedGames(jsonResponse);
      createdGamesProps.setLoadingCreated(false);
    })
    .catch((err) => {
      console.log(err.message);
      createdGamesProps.setLoadingCreated(false);
      createdGamesProps.setSavedCreatedGameError(err.message);
    });
}

function handleCreatedGameDelete(event, createdGamesProps) {
  const gameId = event.target.parentNode.parentNode.id;
  const deleteCreatedData = {
    gameToDelete: gameId,
  };

  fetch(`${API_URL.deleteCreated}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(deleteCreatedData),
  })
    .then((response) => response.json())
    .then((jsonResponse) => console.log(jsonResponse))
    .then(() => {
      return getUserCreatedGames(createdGamesProps);
    })
    .then(() => {
      const gamesLength = createdGamesProps.savedCreatedGames.length;
      createdGamesProps.setMyGamesPagination({
        ...createdGamesProps.myGamesPagination,
        count: gamesLength,
      });
      if (
        createdGamesProps.currentGamesPage >
        Math.ceil(
          createdGamesProps.currentGamesPage.count /
            createdGamesProps.createdGamePageSize
        )
      ) {
        createdGamesProps.setCurrentGamesPage(
          createdGamesProps.currentGamesPage - 1
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export {
  getSavedGames,
  handleSavedGameDelete,
  getUserCreatedGames,
  handleCreatedGameDelete,
};
