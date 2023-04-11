import style from "./voteGamesDisplay.module.css";

export default function VoteGamesDisplay({ voteProps }){

    if (voteProps.loadingVote){
        return <p>Loading...</p>
    }else if (voteProps.votingGames.length === 0){
        return <p>There are no games to vote on now</p>
    }else {
        return voteProps.votingGames.map((voteGame)=>{
            return (
                <div className={style.gameItem} key={voteGame._id} id={voteGame._id}>
          <h4>{voteGame.gameName}</h4>
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
            <div className={style.voteButtonContainer}
            >
                <button className={style.voteYesButton} onClick={voteProps.handleYesVote}>Yes</button>
                <button className={style.voteNoButton} onClick={voteProps.handleNoVote}>No</button>
            </div>
        </div>
            )
        })
    }
}