import React from "react";
import "../CSS/TransferManagerModal.css";

interface MemberInfo {
  id: number;
  firstname: string;
  lastname: string;
  points: number;
}

interface IProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

function TransferManagerModal({ showModal, setShowModal }: IProps) {
  const fakeMembers = Array<MemberInfo>(
    { id: 1, firstname: "John", lastname: "Keng", points: 20 },
    { id: 2, firstname: "Andrew", lastname: "Slade", points: 22 },
    { id: 3, firstname: "Kyle", lastname: "Stevens", points: 55 },
    { id: 4, firstname: "James", lastname: "Cicili", points: 55 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 6, firstname: "Kevin", lastname: "Liang", points: 87 },
    { id: 1, firstname: "John", lastname: "Keng", points: 20 },
    { id: 2, firstname: "Andrew", lastname: "Slade", points: 22 },
    { id: 3, firstname: "Kyle", lastname: "Stevens", points: 55 },
    { id: 4, firstname: "James", lastname: "Cicili", points: 55 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 6, firstname: "Kevin", lastname: "Liang", points: 87 },
    { id: 1, firstname: "John", lastname: "Keng", points: 20 },
    { id: 2, firstname: "Andrew", lastname: "Slade", points: 22 },
    { id: 3, firstname: "Kyle", lastname: "Stevens", points: 55 },
    { id: 4, firstname: "James", lastname: "Cicili", points: 55 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 6, firstname: "Kevin", lastname: "Liang", points: 87 },
    { id: 1, firstname: "John", lastname: "Keng", points: 20 },
    { id: 2, firstname: "Andrew", lastname: "Slade", points: 22 },
    { id: 3, firstname: "Kyle", lastname: "Stevens", points: 55 },
    { id: 4, firstname: "James", lastname: "Cicili", points: 55 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 6, firstname: "Kevin", lastname: "Liang", points: 87 },
    { id: 1, firstname: "John", lastname: "Keng", points: 20 },
    { id: 2, firstname: "Andrew", lastname: "Slade", points: 22 },
    { id: 3, firstname: "Kyle", lastname: "Stevens", points: 55 },
    { id: 4, firstname: "James", lastname: "Cicili", points: 55 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 6, firstname: "Kevin", lastname: "Liang", points: 87 },
    { id: 1, firstname: "John", lastname: "Keng", points: 20 },
    { id: 2, firstname: "Andrew", lastname: "Slade", points: 22 },
    { id: 3, firstname: "Kyle", lastname: "Stevens", points: 55 },
    { id: 4, firstname: "James", lastname: "Cicili", points: 55 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 6, firstname: "Kevin", lastname: "Liang", points: 87 },
    { id: 1, firstname: "John", lastname: "Keng", points: 20 },
    { id: 2, firstname: "Andrew", lastname: "Slade", points: 22 },
    { id: 3, firstname: "Kyle", lastname: "Stevens", points: 55 },
    { id: 4, firstname: "James", lastname: "Cicili", points: 55 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 6, firstname: "Kevin", lastname: "Liang", points: 87 },
    { id: 1, firstname: "John", lastname: "Keng", points: 20 },
    { id: 2, firstname: "Andrew", lastname: "Slade", points: 22 },
    { id: 3, firstname: "Kyle", lastname: "Stevens", points: 55 },
    { id: 4, firstname: "James", lastname: "Cicili", points: 55 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 6, firstname: "Kevin", lastname: "Liang", points: 87 },
    { id: 1, firstname: "John", lastname: "Keng", points: 20 },
    { id: 2, firstname: "Andrew", lastname: "Slade", points: 22 },
    { id: 3, firstname: "Kyle", lastname: "Stevens", points: 55 },
    { id: 4, firstname: "James", lastname: "Cicili", points: 55 },
    { id: 5, firstname: "Lisa", lastname: "Jenki", points: 12 },
    { id: 6, firstname: "Kevin", lastname: "Liang", points: 87 }
  );

  const [sortedList, setSortedList] = React.useState(
    fakeMembers.sort((a, b) => (a.points < b.points ? 1 : -1))
  );

  const handleCancel = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      {showModal ? (
        <div className="TransferManagerModal-Background">
          <div className="TransferManagerModal-Div">
            <div className="TransferManagerModal-TopBar">
              <div className="TransferManagerModal-FirstName">First</div>
              <div className="TransferManagerModal-LastName">Last</div>
            </div>
            <div className="TransferManagerModal-MemberList">
              {sortedList.map((member, index) => {
                return (
                  <div
                    className={
                      index % 2 === 0
                        ? "TransferManagerModal-MemberInfo-lightgrey"
                        : "TransferManagerModal-MemberInfo-white"
                    }
                  >
                    <div className="TransferManagerModal-FirstName">
                      {member.firstname}
                    </div>
                    <div className="TransferManagerModal-LastName">
                      {member.lastname}
                    </div>
                    <button className="TransferManagerModal-SetManagerButton">
                      Set As Manager
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="TransferManagerModal-BottomBar">
              <div className="TransferManagerModal-Buttons">
                <button
                  className="TransferManagerModal-LightButton"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TransferManagerModal;
