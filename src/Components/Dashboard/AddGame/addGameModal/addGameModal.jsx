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
        <h3 className={style.modalText}>
          Do you want your game submitted for voting?
        </h3>
        <p>
          (If you select 'no', the game will only be added to your profile.)
        </p>
        <div className={style.buttonContainer}>
          <button className={style.yesButton} onClick={handleYesButtonClick} data-testid="yesButton">Yes</button>
          <button className={style.cancelButton} onClick={handleNoButtonClick} data-testid="noButton">
            No
          </button>
          <button className={style.cancelButton} onClick={handleCancelClick} data-testid="cancelButton">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
