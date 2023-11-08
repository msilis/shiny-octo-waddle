import style from "./voteGamesDisplay.module.css";
import { handleYesVote, handleNoVote } from "./vote-utils";
import {
  BUTTON_TEXT,
  ERROR_MESSAGE,
  PAGE_TEXT,
  PLACEHOLDER_TEXT,
} from "../../../Utilities/Config/ui-text";

export default function VoteGamesDisplay({ voteProps }) {
  const sliceGameVote = voteProps.voteTotal.slice(
    voteProps.pagination.from,
    voteProps.pagination.to
  );

  if (voteProps.loadingVote) {
    return <p>{PAGE_TEXT.loadingText}</p>;
  } else if (voteProps.votingGames.length === 0) {
    return (
      <p className={style.noVoteText}>{ERROR_MESSAGE.noGamesToShowText}</p>
    );
  } else {
    return voteProps.gamesForPagination.map((voteGame, index) => {
      const yesDisplay =
        sliceGameVote[index]?.yesVote !== undefined
          ? sliceGameVote[index]?.yesVote
          : "0";
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
            voteGame.username
              ? voteGame.username
              : PLACEHOLDER_TEXT.anonymousPlaceholder
          }`}</h4>
          <p>{voteGame.gameText}</p>
          <h5>{PAGE_TEXT.gameFocus}</h5>
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
            <p>{PAGE_TEXT.iVotedText}</p>
          </div>
          <div className={style.voteButtonContainer}>
            <button
              className={style.voteYesButton}
              onClick={(e) => handleYesVote(e, voteProps)}
            >
              {BUTTON_TEXT.yesButton}
            </button>
            <button
              className={style.voteNoButton}
              onClick={(e) => handleNoVote(e, voteProps)}
            >
              {BUTTON_TEXT.noButton}
            </button>
          </div>
        </div>
      );
    });
  }
}
