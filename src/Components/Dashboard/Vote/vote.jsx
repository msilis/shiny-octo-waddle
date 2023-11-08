import { useEffect, useMemo, useState } from "react";
import style from "./vote.module.css";
import VoteGamesDisplay from "./voteGamesDisplay";
import VoteGamePagination from "../../Pagination/gamePagination";
import { getOnlyVotes, getUserVotedGames } from "./vote-utils";
import { ERROR_MESSAGE, PAGE_TEXT } from "../../../Utilities/Config/ui-text";

export default function Vote({ userId }) {
  const [loadingVote, setLoadingVote] = useState(false);
  const [votingGames, setVotingGames] = useState([]);
  const [voteTotal, setVoteTotal] = useState([]);
  const [paginationVote, setPaginationVote] = useState([]);
  const [userVotedGames, setUserVotedGames] = useState([]);
  const [voteError, setVoteError] = useState(false);
  const [voteNetworkError, setVoteNetworkError] = useState(null);
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [gamesForPagination, setGamesForPagination] = useState([]);

  const pageSize = 5;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

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

  useEffect(() => {
    getUserVotedGames(voteProps);
    getOnlyVotes(voteProps);
  }, []);

  useEffect(() => {
    setPaginationVote(voteTotal);
  }, [voteTotal]);

  const paginationDisplay =
    loadingVote || votingGames.length === 0
      ? `${style.paginationDisplayHidden}`
      : `${style.paginationDisplay}`;

  return (
    <div className={style.voteContainer} data-testid="vote-container">
      <div className={style.voteText}>
        <h2>Vote</h2>
        <p className={style.voteSectionText}>{PAGE_TEXT.voteSectionText}</p>
      </div>
      <div className={style.voteGamesDisplay}>
        {voteNetworkError ? (
          <p className="errorText">{ERROR_MESSAGE.failedGettingVoteGames}</p>
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
