import { ERROR_MESSAGE, TOAST_TEXT } from "../../../Utilities/Config/ui-text";
import { showSuccessToast } from "../../../Utilities/toastSuccess";
import { showErrorToast } from "../../../Utilities/toastError";
import { useContext } from "react";
import { UserContext } from "../../../userContext";
import { API_URL } from "../../../Utilities/Config/api";

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
    showErrorToast(TOAST_TEXT.noTopicSelected);
  } else {
    const tagSearchData = {
      tagToSearch: selectedTag,
    };
    setLoadRandomGame(true);
    fetch(API_URL.techniqueSearch, {
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
        fetch(API_URL.randomGame, {
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

export function useHandleGameSave() {
  const userContext = useContext(UserContext);

  return (setSavedGame, randomGame) => {
    const saveGameData = {
      gameName: randomGame.gameName,
      gameText: randomGame.gameText,
      saveUser: userContext.userId,
    };

    fetch(API_URL.saveGame, {
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
        showErrorToast(ERROR_MESSAGE.saveGameError);
        console.log(err);
      });
  };
}

const getGameTags = (setTagArray, setError) => {
  fetch(API_URL.getTags, {
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
      const dataArray = data.map((tag) => tag.techniqueTags);

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

export { handleGoClick, getGameTags };
