// This is the Browse games component. It depends on 'react' and 'react-select'.

import { useEffect, useState } from "react";
import style from "./browseGames.module.css";
import BrowsePagination from "../../Pagination/browsePagination";
import Select from "react-select";
import { getAllGames, getTagsForBrowse } from "./browse-utils";

//Page size for pagination
export const browsePageSize = 5;

export default function BrowseGames() {
  //State of Error
  const [errorMessage, setErrorMessage] = useState("");
  //Pagination info
  const [browsePagination, setBrowsePagination] = useState({
    count: 0,
    from: 0,
    to: browsePageSize,
  });

  //Array of all games from database
  const [allGames, setAllGames] = useState([]);
  //Set the array of games for pagination to work
  const [paginationGames, setPaginationGames] = useState([]);
  //While page is loading, this state is used to show conditional messages
  const [loadingGames, setLoadingGames] = useState(false);
  //State for Select options and filter
  const [browseTags, setBrowseTags] = useState([]);
  //This is the state of the react-select componenet
  const [selectedTag, setSelectedTag] = useState([]);
  //State for div click
  const [showMoreInfo, setShowMoreInfo] = useState("");
  //State for current pagination page
  const [currentPage, setCurrentPage] = useState(1);

  //props to pass to utility functions
  const getAllGamesProps = {
    setLoadingGames,
    setPaginationGames,
    setAllGames,
    setErrorMessage,
    browsePagination,
  };

  const browseTagProps = {
    setBrowseTags,
  };

  function handleGameItemClick(e) {
    setShowMoreInfo(e.target.parentNode.id);
  }

  //=================== Close info
  function handleInfoClose() {
    setShowMoreInfo("");
  }

  //=================== Options for Browse Select
  const browseOptions = browseTags.map((tag, index) => {
    return { value: tag, label: tag, key: index };
  });

  //=================== Select functionality

  function handleTagChange(e) {
    setSelectedTag(e.value);
    //Reset pagination to work with filtered array
    setBrowsePagination({ ...browsePagination, from: 0, to: 5 });
    //Take pagination back to page 1
    setCurrentPage(() => 1);
  }

  //Clear filter
  function handleFilterClear() {
    setSelectedTag([]);
  }

  useEffect(() => {
    getAllGames(getAllGamesProps).then(() => {
      setBrowsePagination({ ...browsePagination, count: allGames.length });
    });
    getTagsForBrowse(browseTagProps);
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
  }, [selectedTag, browsePagination.from, browsePagination.to, allGames]);

  function displayAllGames() {
    if (loadingGames) {
      return <p>Loading Games...</p>;
    } else {
      return paginationGames.map((game) => (
        <div className={style.gameItem} key={game._id} id={game._id}>
          <h5>{game.gameName}</h5>
          <p>{game.gameText}</p>
          <button
            className={
              showMoreInfo === game._id
                ? style.moreInfoButtonHidden
                : style.moreInfoButton
            }
            onClick={handleGameItemClick}
          >
            More Info
          </button>
          <div
            className={
              showMoreInfo === game._id
                ? style.gameExtraInfoDisplay
                : style.gameExtraInfo
            }
            data-id={game._id}
          >
            <h5>Game Focus:</h5>
            <ul>
              {game.gameTechnique.map((focus, index) => (
                <li key={index}>
                  {focus[0].toUpperCase() + focus.substring(1)}
                </li>
              ))}
            </ul>
            <button className={style.closeInfoButton} onClick={handleInfoClose}>
              x
            </button>
          </div>
        </div>
      ));
    }
  }

  const browsePaginationDisplay =
    loadingGames || errorMessage
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
          value={selectedTag.length === 0 ? null : selectedTag.value}
        />
        <button onClick={handleFilterClear} className={style.clearButton}>
          Clear
        </button>
      </div>
      <div className={style.browseGamesDisplay}>
        {errorMessage ? (
          <p className="errorText">There was a server error</p>
        ) : (
          displayAllGames()
        )}
        <div className={browsePaginationDisplay}>
          <BrowsePagination
            browsePagination={browsePagination}
            setBrowsePagination={setBrowsePagination}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
