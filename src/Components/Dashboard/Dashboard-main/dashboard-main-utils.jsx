import { ERROR_MESSAGE, TOAST_TEXT } from "../../../Utilities/Config/ui-text";
import { showSuccessToast } from "../../../Utilities/toastSuccess";

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
  if (selectedTag === "0") {
    alert("You haven't selected a topic.");
  } else {
    const tagSearchData = {
      tagToSearch: selectedTag,
    };
    setLoadRandomGame(true);
    fetch("https://group-class-backend.onrender.com/techniqueSearch", {
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
        fetch("https://group-class-backend.onrender.com/randomGame", {
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
              throw new Error(ERROR_MESSAGE.serverError);
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
  }
};

//Save Game
const handleGameSave = (setSavedGame, randomGame, userId) => {
  //UserId
  //! TODO, this isn't working correctly yet. Look at UserIdContext.Consumer
  /* const userId = useContext(UserIdContext); */
  //Game data
  const saveGameData = {
    gameName: randomGame.gameName,
    gameText: randomGame.gameText,
    saveUser: userId,
  };

  fetch("https://group-class-backend.onrender.com/saveGame", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(saveGameData),
  })
    .then((response) => {
      if (response.status === 201) {
        setSavedGame(true);
        showSuccessToast(TOAST_TEXT.gameSavedSuccess);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//Get tags

const getGameTags = (setTagArray, setError) => {
  fetch("https://group-class-backend.onrender.com/tags", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(ERROR_MESSAGE.serverError);
      }

      setError(null);
      return response.json();
    })
    .then((data) => {
      //Map tags from each object to array
      const dataArray = data.map((tag) => tag.techniqueTags);

      //Flatten the multiple arrays returned by dataArray into single array
      const flattenedArray = dataArray.flat(1);
      const filteredArray = flattenedArray.filter(
        (tag, index) => flattenedArray.indexOf(tag) === index
      );

      setTagArray(filteredArray);
    })
    .catch((err) => {
      setError(err);
    });
};

export { handleGoClick, handleGameSave, getGameTags };
