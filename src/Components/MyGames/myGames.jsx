import SavedGames from "../SavedGames/savedGames";
import style from "./myGames.module.css";

export default function MyGames({userId}){
    return(
        <div className={style.myGamesContainer}>
            <SavedGames userId={userId} />
        </div>
    )
};