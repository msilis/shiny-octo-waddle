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
    handleNoClick();
  }

  function handleYesButtonClick() {
    setShowAddGameModal(false);
    handleYesClick();
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
          <button className={style.yesButton} onClick={handleYesButtonClick}>Yes</button>
          <button className={style.cancelButton} onClick={handleNoButtonClick}>
            No
          </button>
          <button className={style.cancelButton} onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
