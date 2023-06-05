//Fetch Game Techniques

const fetchGameTechniques = (setGameTechniques) => {
  try {
    fetch("https://group-class-backend.onrender.com/getGameTechniques", {
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

//Fetch pieces

const fetchPieces = (setListOfPieces) => {
  fetch("https://group-class-backend.onrender.com/getPieces")
    .then((response) => response.json())
    .then((data) => {
      let sortedPieces = data.map((item) => {
        return item.pieceName;
      });
      //Include option to add various pieces to game
      sortedPieces.push("Various");
      sortedPieces.sort();
      setListOfPieces(sortedPieces);
    })
    .catch((err) => console.log(err));
};

export { fetchGameTechniques, fetchPieces };
