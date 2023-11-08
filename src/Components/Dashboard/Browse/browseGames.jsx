import { useEffect, useState } from "react";
import style from "./browseGames.module.css";
import BrowsePagination from "../../Pagination/browsePagination";
import Select from "react-select";
import { getAllGames, getTagsForBrowse } from "./browse-utils";
import {
  BUTTON_TEXT,
  ERROR_MESSAGE,
  PAGE_TEXT,
} from "../../../Utilities/Config/ui-text";

export const browsePageSize = 5;

export default function BrowseGames() {
  const [errorMessage, setErrorMessage] = useState("");
  const [browsePagination, setBrowsePagination] = useState({
    count: 0,
    from: 0,
    to: browsePageSize,
  });

  const [allGames, setAllGames] = useState([]);
  const [paginationGames, setPaginationGames] = useState([]);
  const [loadingGames, setLoadingGames] = useState(false);
  const [browseTags, setBrowseTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const [showMoreInfo, setShowMoreInfo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  function handleInfoClose() {
    setShowMoreInfo("");
  }

  const browseOptions = browseTags.map((tag, index) => {
    return { value: tag, label: tag, key: index };
  });

  function handleTagChange(event) {
    setSelectedTag(event.value);
    setBrowsePagination({ ...browsePagination, from: 0, to: 5 });
    setCurrentPage(() => 1);
  }

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
      return <p>{PAGE_TEXT.loadingGamesText}</p>;
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
            {BUTTON_TEXT.moreInfoButton}
          </button>
          <div
            className={
              showMoreInfo === game._id
                ? style.gameExtraInfoDisplay
                : style.gameExtraInfo
            }
            data-id={game._id}
          >
            <h5>{PAGE_TEXT.gameFocus}</h5>
            <ul>
              {game.gameTechnique.map((focus, index) => (
                <li key={index}>
                  {focus[0].toUpperCase() + focus.substring(1)}
                </li>
              ))}
            </ul>
            <button className={style.closeInfoButton} onClick={handleInfoClose}>
              {BUTTON_TEXT.xButton}
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

  return (
    <div
      className={style.browseGamesContainer}
      data-testid="browse-games-container"
    >
      <h2 className={style.browseHeading}>{PAGE_TEXT.browseGames}</h2>
      <div className={style.filterContainer}>
        <Select
          options={browseOptions}
          isSearchable={true}
          className={style.browseInput}
          onChange={handleTagChange}
          placeholder={"Choose a topic"}
          value={selectedTag.length === 0 ? null : selectedTag.value}
          data-testid={"browse-select"}
        />
        <button
          onClick={handleFilterClear}
          className={style.clearButton}
          role="button"
        >
          {BUTTON_TEXT.clearButton}
        </button>
      </div>
      <div className={style.browseGamesDisplay}>
        {errorMessage ? (
          <p className="errorText">{ERROR_MESSAGE.serverError}</p>
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
