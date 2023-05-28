import GamePagination from "../../Pagination/gamePagination";
import style from "./voteGamesDisplay.module.css";

export default function VoteGamesDisplay({ voteProps }) {
  //conditional style for vote badge

  if (voteProps.loadingVote) {
    return <p>Loading...</p>;
  } else if (voteProps.votingGames.length === 0) {
    console.log(voteProps.voteTotal);
    console.log(voteProps.voteGames.length);
    return (
      <p className={style.noVoteText}>There are no games to vote on now...</p>
    );
  } else {
    return voteProps.gamesForPagination.map((voteGame, index) => {
      const voteStyle = voteProps.userVotedGames.includes(voteGame._id)
        ? `${style.votedTextVisible}`
        : `${style.votedTextHidden}`;
      return (
        <div className={style.gameItem} key={voteGame._id} id={voteGame._id}>
          <h4>{`${voteGame.gameName} created by ${
            voteGame.username ? voteGame.username : "Anonymous"
          }`}</h4>
          <p>{voteGame.gameText}</p>
          <h5>Game focus:</h5>
          <div className={style.gameTechniqueContainer}>
            {voteGame.gameTechnique.map((item) => {
              return <p key={item.key}>{item.label}</p>;
            })}
          </div>
          <div className={style.voteCountDisplay}>
            <p>Yes: {voteGame.yesVote}</p>
            <p>No: {voteGame.noVote}</p>
          </div>
          <div className={voteStyle}>
            <p>I voted!</p>
          </div>
          <div className={style.voteButtonContainer}>
            <button
              className={style.voteYesButton}
              onClick={voteProps.handleYesVote}
            >
              Yes
            </button>
            <button
              className={style.voteNoButton}
              onClick={voteProps.handleNoVote}
            >
              No
            </button>
          </div>
        </div>
      );
    });
  }
}
