import { useEffect, useState } from "react";
import style from "./vote.module.css";
import VoteGamesDisplay from "./voteGamesDisplay";

export default function Vote({ userId }) {
  //Loading state
  const [loadingVote, setLoadingVote] = useState(false);
  //State for games to be voted on
  const [votingGames, setVotingGames] = useState([]);

  //props to send to VoteGamesDisplay componenet

  const voteProps = {
    loadingVote,
    setLoadingVote,
    votingGames,
    setVotingGames,
    handleYesVote,
    handleNoVote,
  };

  //Fetch games to vote on from the database
  function getVoteGames() {
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
          console.log(jsonResponse);
          setLoadingVote(false);
        });
    } catch (err) {
      console.log(err);
    }
  }
//TODO finish adding in yes vote endpoint and send info
  //Handle yes and no votes
  function handleYesVote(e) {
    console.log(e.target.parentNode.parentNode.id);
    const yesVoteData = {
      gameId: e.target.parentNode.parentNode.id,
      updateVoteValue: 1,
      userId: userId,
    };
  }
  function handleNoVote(e) {
    console.log(e.target.parentNode.parentNode.id);
  }
  //Call function at page load to get games to be voted on
  useEffect(() => {
    getVoteGames();
  }, []);

  return (
    <div className={style.voteContainer}>
      <div className={style.voteText}>
        <h2>Vote</h2>
        <p>
          Vote on games on this page. If a game gets to 10 votes, it will be
          added to the main games database.
        </p>
      </div>
      <div className={style.voteGamesDisplay}>
        <VoteGamesDisplay voteProps={voteProps} />
      </div>
    </div>
  );
}
