import { ERROR_MESSAGE } from "../../../Utilities/Config/ui-text";

function getAllGames(getAllGamesProps) {
  getAllGamesProps.setLoadingGames(true);
  return fetch("https://group-class-backend.onrender.com/gameSearch", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 500 || !response.ok) {
        throw new Error(ERROR_MESSAGE.serverError);
      } else {
        return response.json();
      }
    })
    .then((jsonResponse) => {
      getAllGamesProps.setPaginationGames(
        jsonResponse.slice(
          getAllGamesProps.browsePagination.from,
          getAllGamesProps.browsePagination.to
        )
      );
      getAllGamesProps.setAllGames(jsonResponse);
    })
    .catch((err) => {
      console.log(err.message);
      getAllGamesProps.setErrorMessage(err);
    })
    .finally(() => getAllGamesProps.setLoadingGames(false));
}

function getTagsForBrowse(browseTagProps) {
  return fetch("https://group-class-backend.onrender.com/gameTechniques", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(ERROR_MESSAGE.tagsError);
      } else {
        return response.json();
      }
    })
    .then((jsonResponse) => {
      const gameTechArray = jsonResponse.map((tag) => tag.gameTechnique);
      const flattenedGameTechArray = gameTechArray.flat(1);
      const filteredGameTechArray = flattenedGameTechArray.filter(
        (technique, index) =>
          flattenedGameTechArray.indexOf(technique) === index
      );
      browseTagProps.setBrowseTags(filteredGameTechArray);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export { getAllGames, getTagsForBrowse };
