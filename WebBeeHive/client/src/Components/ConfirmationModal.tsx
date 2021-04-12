import React from "react";
import "../CSS/ConfirmationModal.css";

interface IProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  removeFunction: () => void;
}

function ConfirmationModal({
  showModal,
  setShowModal,
  removeFunction,
}: IProps) {
  const handleConfirm = () => {
    removeFunction();
    setShowModal(!showModal);
  };

  const handleCancel = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      {showModal ? (
        <div className="ConfirmationModal-Background">
          <div className="ConfirmationModal-Div">
            <div className="ConfirmationModal-Text">
              <div className="ConfirmationModal-Warning">
                Are you sure you want to delete this?
              </div>
            </div>
            <div className="ConfirmationModal-Buttons">
              <button
                className="ConfirmationModal-LightButton"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="ConfirmationModal-DarkButton"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ConfirmationModal;
