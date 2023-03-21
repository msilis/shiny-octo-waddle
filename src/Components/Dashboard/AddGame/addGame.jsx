import { useRef, useState } from "react";
import Select from "react-select";
import style from "./addGame.module.css";

export default function AddGame({ setAddGame, tagArray }) {
  const gameName = useRef();
  const gameText = useRef();
  const container = useRef();
  const [addGameTags, setAddGameTags] = useState([]);
    console.log(addGameTags)
  //Cancel Button click
  function handleCancelClick(event) {
    setAddGame(false);
  }

  //Options to send to Select element
  const addGameOptions = tagArray.map((tag, index) => {
    return { value: tag, label: tag, key: index };
  });

  //Handle tag input
  function handleTagChange(e){
    console.log(e);
    setAddGameTags(e);
  }

  //Handle adding game to user's games
  function handleAddGame(){
    //TODO Post request to add game
  }

  
  return (
    <div
      className={style.addGameContainer}
      id="addGameContainer"
      ref={container}
    >
      <h3>Add a game!</h3>
      <input placeholder="Game Name" ref={gameName} />
      <textarea
        placeholder="Game Description"
        ref={gameText}
        rows="6"
        cols="80"
      />
      <Select
        options={addGameOptions}
        isMulti={true}
        className={style.addGameSelectInput}
        isSearchable={true}
        onChange={handleTagChange}
      />
      <div className={style.addGameViewButton}>Add</div>
      <div className={style.addGameViewButton} onClick={handleCancelClick}>
        Cancel
      </div>
    </div>
  );
}
