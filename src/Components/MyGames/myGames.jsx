import SavedGames from "../SavedGames/savedGames";
import style from "./myGames.module.css";

export default function MyGames({ userId }) {
  return (
    <div className={style.myGamesContainer} data-testid="my-games">
      <SavedGames userId={userId} />
    </div>
  );
}
