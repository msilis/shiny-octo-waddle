import { useEffect, useState } from "react";
import style from "./browseGames.module.css";
import BrowsePagination from "../../Pagination/browsePagination";
import Select from "react-select";

//Page size for pagination
export const browsePageSize = 5;

export default function BrowseGames() {
  //Pagination info
  const [browsePagination, setBrowsePagination] = useState({
    count: 0,
    from: 0,
    to: browsePageSize,
  });

  //Array of all games from database
  const [allGames, setAllGames] = useState([]);
  const [paginationGames, setPaginationGames] = useState([]);
  const [loadingGames, setLoadingGames] = useState(false);
  //State for Select options and filter
  const [browseTags, setBrowseTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);

  function getAllGames() {
    //Get all games from database
    setLoadingGames(true);
    return fetch("http://localhost:8080/gameSearch", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        setPaginationGames(
          jsonResponse.slice(browsePagination.from, browsePagination.to)
        );
        setAllGames(jsonResponse);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingGames(false));
  }

  function getTagsForBrowse() {
    return fetch("http://localhost:8080/gameTechniques", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        const gameTechArray = jsonResponse.map((tag) => tag.gameTechnique);
        const flattenedGameTechArray = gameTechArray.flat(1);
        const filteredGameTechArray = flattenedGameTechArray.filter(
          (technique, index) =>
            flattenedGameTechArray.indexOf(technique) === index
        );
        setBrowseTags(filteredGameTechArray);
        console.log(browseTags);
      });
  }

  //=================== Options for Browse Select
  const browseOptions = browseTags.map((tag, index) => {
    return { value: tag, label: tag, key: index };
  });

  console.log(paginationGames);

  //=================== Select functionality

  function handleTagChange(e) {
    console.log(e)
    setSelectedTag(e.value);
  }

    //Clear filter
    function handleFilterClear() {
      setSelectedTag([]);
    }

  useEffect(() => {
    getAllGames().then(() => {
      setBrowsePagination({ ...browsePagination, count: allGames.length });
    });
    getTagsForBrowse();
  }, [browsePagination.from, browsePagination.to, allGames.length]);

  //Set filter for games
  useEffect(() => {
    const filteredTagGames =
      selectedTag.length === 0
        ? allGames
        : allGames.filter((game) =>
            game.gameTechnique.some((tag) => selectedTag.includes(tag))
          );
    setPaginationGames(
      filteredTagGames.slice(browsePagination.from, browsePagination.to)
    );
    setBrowsePagination({
      ...browsePagination,
      count: filteredTagGames.length,
    });
    console.log(filteredTagGames);
  }, [selectedTag, browsePagination.from, browsePagination.to, allGames]);



  function displayAllGames() {
    if (loadingGames) {
      return <p>Loading Games...</p>;
    } else {
      return paginationGames.map((game) => (
        <div className={style.gameItem} key={game._id} id={game._id}>
          <h5>{game.gameName}</h5>
          <p>{game.gameText}</p>
        </div>
      ));
    }
  }

  const browsePaginationDisplay = loadingGames
    ? `${style.browsePaginationHidden}`
    : `${style.browsePaginationVisible}`;

  /* ======================================================================================
|||||||||||||||||||||||||||||||||| Return |||||||||||||||||||||||||||||||||||||||||||||||
========================================================================================= */

  return (
    <div className={style.browseGamesContainer}>
      <h2 className={style.browseHeading}>Browse Games to Play</h2>
      <div className={style.filterContainer}>
        <Select
          options={browseOptions}
          isSearchable={true}
          className={style.browseInput}
          onChange={handleTagChange}
          placeholder={"Choose a topic"}
          value={selectedTag.length === 0 ? null : selectedTag.value }
          
        />
        <button onClick={handleFilterClear} className={style.clearButton}>Clear</button>
      </div>
      <div className={style.browseGamesDisplay}>
        {displayAllGames()}
        <div className={browsePaginationDisplay}>
          <BrowsePagination
            browsePagination={browsePagination}
            setBrowsePagination={setBrowsePagination}
          />
        </div>
      </div>
    </div>
  );
}
