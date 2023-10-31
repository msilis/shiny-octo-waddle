import style from "./dashboard-main.module.css";
import { useState, useEffect } from "react";
import classnames from "classnames";
import Select from "react-select";
import {
  handleGoClick,
  useHandleGameSave,
  getGameTags,
} from "./dashboard-main-utils";
import {
  BUTTON_TEXT,
  ERROR_MESSAGE,
  PAGE_TEXT,
} from "../../../Utilities/Config/ui-text";

export default function DashboardMain({
  firstName,
  userId,
  tagArray,
  setTagArray,
}) {
  const [selectedTag, setSelectedTag] = useState("0");
  const [results, setResults] = useState(true);
  const [reviewPieces, setReviewPieces] = useState([]);
  const [randomGame, setRandomGame] = useState([]);
  const [savedGame, setSavedGame] = useState(false);
  const [loadRandomGame, setLoadRandomGame] = useState(false);
  const [error, setError] = useState(null);

  //Call API to get tags on initial page load ==================================================
  useEffect(() => {
    getGameTags(setTagArray, setError);
  }, []);

  const handleGameSave = useHandleGameSave();

  //Get options for tag dropdown ==============================================================

  const tagOptions = tagArray.map((tag, index) => {
    return { value: tag, label: tag, key: index };
  });

  //Save game functionality ===================================================================
  const saveGameText = savedGame
    ? null
    : () => handleGameSave(setSavedGame, randomGame);
  const saveGameStyle =
    savedGame || error ? style.saveButtonDisable : style.saveButton;

  //Text for greeting ==========================================================================
  const greetText = `Hi ${firstName}, what do you want to work on in your group?`;

  /* ============================================================================================
                                    Return
  =============================================================================================== */
  return (
    <div
      className={classnames(style.dashboardMainContainer, style.fadeContainer)}
    >
      <div className={style.dashboardMain}>
        <h2>{greetText}</h2>
        {/* TODO: remove text from h3 and replace with text from ui object */}
        <h3>Book One Techniques</h3>
        <div className={style.techniqueTagsContainer}>
          {error ? (
            <p className="errorText">{ERROR_MESSAGE.networkError}</p>
          ) : (
            <Select
              className={style.selectInput}
              options={tagOptions}
              isSearchable={true}
              onChange={(e) => {
                setSelectedTag(e.value);
              }}
            />
          )}
        </div>
        {!error && (
          <div
            className={style.goButton}
            onClick={() =>
              handleGoClick(
                setLoadRandomGame,
                setReviewPieces,
                setError,
                setRandomGame,
                setResults,
                setSavedGame,
                selectedTag
              )
            }
          >
            <span>{BUTTON_TEXT.goButton}</span>
          </div>
        )}
        <div
          className={classnames(style.resultContainer, style.fadeContainer, {
            [style.resultsHidden]: results,
          })}
        >
          <div className={style.reviewPieceContainer}>
            <div className={style.reviewHeading}>
              <h3 className={style.reviewHeadingText}>
                {error
                  ? `${ERROR_MESSAGE.genericError}`
                  : `${PAGE_TEXT.reviewPieceText} ${selectedTag}`}
              </h3>
            </div>
            <div className={style.reviewPieceList}>
              {loadRandomGame ? (
                <>{PAGE_TEXT.loadingText}</>
              ) : (
                reviewPieces.map((piece) => (
                  <div
                    className={style.reviewPieceItem}
                    key={crypto.randomUUID()}
                  >
                    {piece}
                  </div>
                ))
              )}
            </div>
          </div>
          {loadRandomGame ? (
            <></>
          ) : (
            <div className={style.randomGameContainer}>
              <h3 className={style.reviewHeadingText}>
                {error ? `${ERROR_MESSAGE.genericError}` : randomGame.gameName}
              </h3>
              <p className={style.randomGameText}>{randomGame.gameText}</p>
              <div className={saveGameStyle} onClick={saveGameText}>
                <span>
                  {savedGame
                    ? `${BUTTON_TEXT.gameSaved}`
                    : `${BUTTON_TEXT.saveGame}`}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
