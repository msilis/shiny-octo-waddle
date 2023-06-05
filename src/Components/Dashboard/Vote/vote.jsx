import { useEffect, useMemo, useState } from "react";
import style from "./vote.module.css";
import VoteGamesDisplay from "./voteGamesDisplay";
import VoteGamePagination from "../../Pagination/gamePagination";
import { getOnlyVotes } from "./vote-utils";
import { toast } from "react-toastify";

export default function Vote({ userId }) {
  //Loading state
  const [loadingVote, setLoadingVote] = useState(false);
  //State for games to be voted on
  const [votingGames, setVotingGames] = useState([]);
  const [voteTotal, setVoteTotal] = useState([]);
  const [paginationVote, setPaginationVote] = useState([]);
  const [userVotedGames, setUserVotedGames] = useState([]);
  //State for overlay
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

  //props to send to VoteGamesDisplay componenet

  const voteProps = {
    loadingVote,
    setLoadingVote,
    votingGames,
    setVotingGames,
    handleYesVote,
    handleNoVote,
    voteError,
    setVoteError,
    voteTotal,
    userVotedGames,
    gamesForPagination,
    setGamesForPagination,
    paginationVote,
    pagination,
  };
  //Handle yes and no votes
  function handleYesVote(e) {
    const yesVoteData = {
      gameId: e.target.parentNode.parentNode.id,
      updateVoteValue: 1,
      userId: userId,
    };
    fetch("https://group-class-backend.onrender.com/trackVote", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-custom-cookie": "jwt",
      },
      credentials: "include",
      body: JSON.stringify(yesVoteData),
    })
      .then((response) => {
        if (response.status === 409) {
          toast.error("You have already voted for this game.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
          throw new Error("You have already voted for this game");
        } else if (response.status === 201) {
          console.log("getUserVotedGames");
          setVoteSuccess(true);
          getUserVotedGames();
          return response.json();
        }
      })
      .then(() => {
        getOnlyVotes(setVoteTotal).then(() => {
          console.log(voteTotal);
          setVoteSuccess(false);
          getUserVotedGames();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleNoVote(e) {
    const noVoteData = {
      gameId: e.target.parentNode.parentNode.id,
      updateVoteValue: 0,
      userId: userId,
    };
    fetch("https://group-class-backend.onrender.com/trackVote", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-custom-cookie": "jwt",
      },
      credentials: "include",
      body: JSON.stringify(noVoteData),
    })
      .then((response) => {
        if (response.status === 409) {
          toast.error("You have already voted for this game.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
          throw new Error("You have already voted for this game");
        } else {
          setVoteSuccess(true);
          return response.json();
        }
      })
      .then(() => {
        getOnlyVotes(setVoteTotal).then(() => {
          getUserVotedGames();
          setVoteSuccess(false);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Get a list of games the user has voted on

  function getUserVotedGames() {
    setVoteNetworkError(null);
    const idToCheck = {
      userId: userId,
    };
    fetch("https://group-class-backend.onrender.com/getUserVotes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(idToCheck),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(
            "There was a network error and I could not get the games to vote on"
          );
        } else {
          return response.json();
        }
      })
      .then((jsonResponse) => {
        let votedGames = jsonResponse.map((el) => {
          return el._id;
        });
        setUserVotedGames(votedGames);
      })
      .catch((err) => {
        console.log(err.message);
        setVoteNetworkError(err.message);
      });
  }

  //Call function at page load to get games to be voted on
  useEffect(() => {
    getUserVotedGames();
    getOnlyVotes(setVoteTotal);
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
