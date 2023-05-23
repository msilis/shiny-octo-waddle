//Get Pieces for modal from database

const fetchPieces = (setListOfPieces, setLoadingPieces) => {
    try {
      setLoadingPieces(true);
      fetch("http://localhost:8080/getPieces")
        .then((response) => response.json())
        .then((data) => {
          let sortedPieces = data.map((item) => {
            return item.pieceName;
          });
          sortedPieces.push("Various");
          sortedPieces.sort();
          setListOfPieces(sortedPieces);
          setLoadingPieces(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  //Get techniques for modal from database

  const fetchGameTechniques = (setGameTechniques, setLoadingFocus) => {
    try {
      setLoadingFocus(true);
      fetch("http://localhost:8080/getGameTechniques", {
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
          setGameTechniques(filteredGameTechniqueArray);
          setLoadingFocus(false);
        });
    } catch (err) {
      console.log(err);
    }
  }

  export { fetchPieces, fetchGameTechniques }