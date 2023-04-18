import { useEffect, useState } from "react";
import style from "./vote.module.css";
import VoteGamesDisplay from "./voteGamesDisplay";

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
    userVotedGames
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

  //Fetch games to vote on from the database
  function getVoteGames() {
    return new Promise((resolve, reject) => {
      try {
        setLoadingVote(true);
        fetch("http://localhost:8080/gamesForVote", {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            setVotingGames(jsonResponse);
            return;
          })
          .then(() => {
            getOnlyVotes();
            setLoadingVote(false);
            resolve();
          });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  //Fetch vote count to be able to update only count, not whole component
  function getOnlyVotes() {
    return new Promise((resolve, reject) => {
      try {
        fetch("http://localhost:8080/getVoteTotals", {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((jsonResponse) => setVoteTotal(jsonResponse))
          .then(() => {
            console.log(voteTotal);
            resolve();
          });
      } catch (err) {
        console.log(err);
        reject();
      }
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
        },
        body: JSON.stringify(yesVoteData),
      })
        .then((response) => {
          if (response.status === 409) {
            setVoteError(true);
            throw new Error("You have already vote for this game");
          } else {
            return response.json();
          }
        })
        .then(() => {
          getOnlyVotes().then(() => {
            setTimeout(() => {
              setVoteSuccess(true);
            }, 1000);
          });
        }).catch((error)=>{console.log(error)});
  }

  function handleNoVote(e) {
    console.log(e.target.parentNode.parentNode.id);
    const noVoteData = {
      gameId: e.target.parentNode.parentNode.id,
      updateVoteValue: 0,
      userId: userId,
    };
    fetch("http://localhost:8080/trackVote", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
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
            setTimeout(() => {
              setVoteSuccess(true);
            }, 1000);
          });
        }).catch((error)=>{console.log(error)});
  }

  //Get a list of games the user has voted on

  function getUserVotedGames(){

    const idToCheck = {
      userId: userId
    }
    console.log(idToCheck)
    fetch("http://localhost:8080/getUserVotes", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(idToCheck)
    }).then(response => response.json()).then((jsonResponse)=> {
      let votedGames = jsonResponse.map((el)=>{
        return el._id
      });
      setUserVotedGames(votedGames);
    })
  };

  console.log(userVotedGames, "User voted games")
  //Call function at page load to get games to be voted on
  useEffect(() => {
    getVoteGames();
    getUserVotedGames();
  }, []);

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
      <div className={voteSuccessOverlay}>
        <div className={style.overlayContainer}>
          <h3>Vote counted successfully!</h3>
          <button className={style.okButton} onClick={handleOkSuccessClick}>
            Sweet!
          </button>
        </div>
      </div>
      <div className={style.voteText}>
        <h2>Vote</h2>
        <p>
          Vote on games on this page. If a game gets to 25 votes, it will be
          added to the main games database.
        </p>
      </div>
      <div className={style.voteGamesDisplay}>
        <VoteGamesDisplay voteProps={voteProps} />
      </div>
    </div>
  );
}
