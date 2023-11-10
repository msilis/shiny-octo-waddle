//Fetch Game Techniques

import { API_URL } from "../../../../Utilities/Config/api";

const fetchGameTechniques = (setGameTechniques) => {
  try {
    fetch(API_URL.getGameTechniques, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const gameTechniqueArray = data.map((tag) => tag.gameTechnique);
        const flattedGameTechniqueArray = gameTechniqueArray.flat(1);
        const filteredGameTechniqueArray = flattedGameTechniqueArray.filter(
          (tag, index) => flattedGameTechniqueArray.indexOf(tag) === index
        );
        filteredGameTechniqueArray.sort();
        setGameTechniques(filteredGameTechniqueArray);
      });
  } catch (err) {
    console.log(err);
  }
};

const fetchPieces = (setListOfPieces) => {
  fetch(API_URL.getPieces)
    .then((response) => response.json())
    .then((data) => {
      let sortedPieces = data.map((item) => {
        return item.pieceName;
      });
      sortedPieces.push("Various");
      sortedPieces.sort();
      setListOfPieces(sortedPieces);
    })
    .catch((err) => console.log(err));
};

export { fetchGameTechniques, fetchPieces };
