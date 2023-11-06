import { BUTTON_TEXT, MODAL_TEXT } from "../../../../Utilities/Config/ui-text";
import style from "./addGameModal.module.css";

export default function AddGameModal({
  showAddGameModal,
  setShowAddGameModal,
  handleYesClick,
  handleNoClick,
}) {
  const modalDisplay = showAddGameModal
    ? `${style.modalVisible}`
    : `${style.modalHidden}`;

  function handleCancelClick() {
    setShowAddGameModal(false);
  }

  function handleNoButtonClick() {
    setShowAddGameModal(false);
    handleNoClick(true);
  }

  function handleYesButtonClick() {
    setShowAddGameModal(false);
    handleYesClick(true);
  }

  return (
    <div className={modalDisplay}>
      <div className={style.addGameModalContainer}>
        <h3 className={style.modalText}>{MODAL_TEXT.addGameVote}</h3>
        <p>({MODAL_TEXT.addGameVoteAdditional})</p>
        <div className={style.buttonContainer}>
          <button
            className={style.yesButton}
            onClick={handleYesButtonClick}
            data-testid="yesButton"
          >
            {BUTTON_TEXT.yesButton}
          </button>
          <button
            className={style.cancelButton}
            onClick={handleNoButtonClick}
            data-testid="noButton"
          >
            {BUTTON_TEXT.noButton}
          </button>
          <button
            className={style.cancelButton}
            onClick={handleCancelClick}
            data-testid="cancelButton"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
