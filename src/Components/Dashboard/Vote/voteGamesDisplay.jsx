import style from "./voteGamesDisplay.module.css";

export default function VoteGamesDisplay({ voteProps }) {
  //conditional style for vote badge

  const sliceGameVote = voteProps.voteTotal.slice(
    voteProps.pagination.from,
    voteProps.pagination.to
  );

  if (voteProps.loadingVote) {
    return <p>Loading...</p>;
  } else if (voteProps.votingGames.length === 0) {
    return (
      <p className={style.noVoteText}>There are no games to vote on now...</p>
    );
  } else {
    return voteProps.gamesForPagination.map((voteGame, index) => {
      //Yes Vote count display
      const yesDisplay =
        sliceGameVote[index]?.yesVote !== undefined
          ? sliceGameVote[index]?.yesVote
          : "0";
      //No Vote count display
      const noDisplay =
        sliceGameVote[index]?.noVote !== undefined
          ? sliceGameVote[index]?.noVote
          : "0";

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
            <p>Yes: {sliceGameVote[index]?.yesVote || "0"}</p>
            <p>No: {sliceGameVote[index]?.noVote || "0"}</p>
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
