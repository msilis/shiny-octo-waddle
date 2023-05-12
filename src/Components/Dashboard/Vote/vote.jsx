import { useEffect, useState } from "react";
import style from "./vote.module.css";
import VoteGamesDisplay from "./voteGamesDisplay";
import VoteGamePagination from "../../Pagination/gamePagination";

export default function Vote({ userId }) {
  //Loading state
  const [loadingVote, setLoadingVote] = useState(false);
  //State for games to be voted on
  const [votingGames, setVotingGames] = useState([]);
  const [voteTotal, setVoteTotal] = useState([]);
  const [userVotedGames, setUserVotedGames] = useState([]);
  //State for overlay
  //Vote Error
  const [voteError, setVoteError] = useState(false);
  //Vote sucess
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [gamesForPagination, setGamesForPagination] = useState([]);

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
  };

  //Vote error overlay
  const voteErrorOverlay = voteError
    ? `${style.voteErrorVisible}`
    : `${style.voteErrorHidden}`;

  function handleOkErrorClick() {
    setVoteError(false);
  }

  //Vote sucess overlay
  const voteSuccessOverlay = voteSuccess
    ? `${style.voteSuccessVisible}`
    : `${style.voteSuccessHidden}`;

  function handleOkSuccessClick() {
    setVoteSuccess(false);
  }

  //Fetch vote count to be able to update only count, not whole component
  function getOnlyVotes() {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:8080/getVoteTotals", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "X-custon-cookie": "jwt",
        },
        credentials: "include",
      })
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => setVoteTotal(jsonResponse))
        .then(() => {
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  }

  //Handle yes and no votes
  function handleYesVote(e) {
    const yesVoteData = {
      gameId: e.target.parentNode.parentNode.id,
      updateVoteValue: 1,
      userId: userId,
    };
    fetch("http://localhost:8080/trackVote", {
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
          setVoteError(true);
          throw new Error("You have already vote for this game");
        } else if (response.status === 202) {
          console.log(votingGames, "voting games");
          setVoteSuccess(true);
          getUserVotedGames();
        } else {
          return response.json();
        }
      })
      .then(() => {
        getOnlyVotes().then(() => {
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
    fetch("http://localhost:8080/trackVote", {
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
          setVoteError(true);
          throw new Error("You have already voted for this game");
        } else {
          return response.json();
        }
      })
      .then(() => {
        getOnlyVotes().then(() => {
          getUserVotedGames();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Get a list of games the user has voted on

  function getUserVotedGames() {
    const idToCheck = {
      userId: userId,
    };
    fetch("http://localhost:8080/getUserVotes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(idToCheck),
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        let votedGames = jsonResponse.map((el) => {
          return el._id;
        });
        setUserVotedGames(votedGames);
      });
  }

  //Call function at page load to get games to be voted on
  useEffect(() => {
    getUserVotedGames();
  }, [voteSuccess]);

  //Conditionally show pagination
  const paginationDisplay =
    loadingVote || votingGames.length === 0
      ? `${style.paginationDisplayHidden}`
      : `${style.paginationDisplay}`;

  console.log();

  return (
    <div className={style.voteContainer}>
      <div className={voteErrorOverlay}>
        <div className={style.overlayContainer}>
          <h3>You have already voted for this game!</h3>
          <button className={style.okButton} onClick={handleOkErrorClick}>
            Ok
          </button>
        </div>
      </div>
      <div className={style.voteText}>
        <h2>Vote</h2>
        <p className={style.voteSectionText}>
          Vote on games on this page. If a game gets to 25 votes, it will be
          added to the main games database.
        </p>
      </div>
      <div className={style.voteGamesDisplay}>
        <VoteGamesDisplay voteProps={voteProps} />
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
        />
      </div>
    </div>
  );
}
