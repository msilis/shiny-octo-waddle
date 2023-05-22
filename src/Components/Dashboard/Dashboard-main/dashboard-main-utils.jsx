//Go Button

const handleGoClick = (
  setLoadRandomGame,
  setReviewPieces,
  setError,
  setRandomGame,
  setResults,
  setSavedGame,
  selectedTag
) => {
  const tagSearchData = {
    tagToSearch: selectedTag,
  };
  setLoadRandomGame(true);
  fetch("http://localhost:8080/techniqueSearch", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(tagSearchData),
  })
    .then((response) => response.json())
    .then((data) => {
      const reviewArray = data.map((piece) => piece.pieceName);
      setReviewPieces(reviewArray);
    })
    .then(
      fetch("http://localhost:8080/randomGame", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "X-custom-cookie": "jwt",
        },
        credentials: "include",
      })
        .then((response) => {
          if (response.status === 401) {
            setError(true);
            throw new Error("There was an error with the server");
          } else {
            return response.json();
          }
        })
        .then((data) => {
          setRandomGame(data);
          setLoadRandomGame(false);
        })
    )
    .catch((err) => console.log(err));

  setResults(false);
  setSavedGame(false);
};

//Save Game
const handleGameSave = (setSavedGame, randomGame, userId) => {
  const saveGameData = {
    gameName: randomGame.gameName,
    gameText: randomGame.gameText,
    saveUser: userId,
  };

  fetch("http://localhost:8080/saveGame", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(saveGameData),
  })
    .then((response) => {
      if (response.status === 201) {
        setSavedGame(true);
      }
    })
    .catch((err) => console.log(err));
};

//Get tags

const getGameTags = (setTagArray) =>{
  try {
      fetch("http://localhost:8080/tags", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          //Map tags from each object to array
          const dataArray = data.map((tag) => tag.techniqueTags);

          //Flatten the multiple arrays returned by dataArray into single array
          const flattenedArray = dataArray.flat(1);
          const filteredArray = flattenedArray.filter(
            (tag, index) => flattenedArray.indexOf(tag) === index
          );

          setTagArray(filteredArray);
        });
    } catch (err) {
      console.log(err);
    }
}

export { handleGoClick, handleGameSave, getGameTags };
