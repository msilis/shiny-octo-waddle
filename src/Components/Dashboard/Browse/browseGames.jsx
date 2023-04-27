import { useEffect, useState } from "react";
import style from "./browseGames.module.css";
import BrowsePagination from "../../Pagination/browsePagination";

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

  useEffect(() => {
    getAllGames().then(() => {
      setBrowsePagination({ ...browsePagination, count: allGames.length });
    });
  }, [browsePagination.from, browsePagination.to, allGames.length]);

  console.log(allGames.length);

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

  return (
    <div className={style.browseGamesContainer}>
      <h2 className={style.browseHeading}>Browse Games to Play</h2>
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
