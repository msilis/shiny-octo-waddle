import { useEffect, useMemo, useState } from "react";
import style from "./vote.module.css";
import VoteGamesDisplay from "./voteGamesDisplay";
import VoteGamePagination from "../../Pagination/gamePagination";
import { getOnlyVotes, getUserVotedGames } from "./vote-utils";

export default function Vote({ userId }) {
  //Loading state
  const [loadingVote, setLoadingVote] = useState(false);
  //State for games to be voted on
  const [votingGames, setVotingGames] = useState([]);
  const [voteTotal, setVoteTotal] = useState([]);
  const [paginationVote, setPaginationVote] = useState([]);
  const [userVotedGames, setUserVotedGames] = useState([]);
  //Vote Error
  const [voteError, setVoteError] = useState(false);
  const [voteNetworkError, setVoteNetworkError] = useState(null);
  //Vote sucess
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [gamesForPagination, setGamesForPagination] = useState([]);

  //State and properties for pagination
  const pageSize = 5;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  //props for components

  const voteProps = {
    loadingVote,
    setLoadingVote,
    votingGames,
    setVotingGames,
    voteError,
    setVoteError,
    voteTotal,
    setVoteTotal,
    userVotedGames,
    setUserVotedGames,
    gamesForPagination,
    setGamesForPagination,
    paginationVote,
    pagination,
    userId,
    setVoteNetworkError,
    voteNetworkError,
    setVoteSuccess,
  };

  //Call function at page load to get games to be voted on
  useEffect(() => {
    getUserVotedGames(voteProps);
    getOnlyVotes(voteProps);
  }, []);

  useEffect(() => {
    setPaginationVote(voteTotal);
  }, [voteTotal]);

  //Conditionally show pagination
  const paginationDisplay =
    loadingVote || votingGames.length === 0
      ? `${style.paginationDisplayHidden}`
      : `${style.paginationDisplay}`;

  return (
    <div className={style.voteContainer}>
      <div className={style.voteText}>
        <h2>Vote</h2>
        <p className={style.voteSectionText}>
          Vote on games on this page. If a game gets to 25 votes, it will be
          added to the main games database.
        </p>
      </div>
      <div className={style.voteGamesDisplay}>
        {voteNetworkError ? (
          <p className="errorText">
            There was an error getting the games to vote on.
          </p>
        ) : (
          <VoteGamesDisplay voteProps={voteProps} />
        )}
      </div>
      <div className={paginationDisplay}>
        <VoteGamePagination
          votingGames={votingGames}
          setVotingGames={setVotingGames}
          setVoteTotal={setVoteTotal}
          voteTotal={voteTotal}
          setLoadingVote={setLoadingVote}
          gamesForPagination={gamesForPagination}
          setGamesForPagination={setGamesForPagination}
          voteSuccess={voteSuccess}
          paginationVote={paginationVote}
          setPaginationVote={setPaginationVote}
          pagination={pagination}
          setPagination={setPagination}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
}
