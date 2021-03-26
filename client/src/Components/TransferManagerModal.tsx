import React from "react";
import "../CSS/TransferManagerModal.css";
import * as UserAPI from "../api/User";
import * as EventAPI from "../api/Event";
import { store } from "../store";
import { MemberInfo } from "../Interfaces";

interface IProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  setReload: any;
  reload: any;
  event: any;
}

function TransferManagerModal({
  showModal,
  setShowModal,
  reload,
  setReload,
  event,
}: IProps) {
  const fakeMembers = Array<MemberInfo>({
    id: "",
    Firstname: "",
    Lastname: "",
    email: "",
    userPoints: 0,
  });

  const [sortedList, setSortedList] = React.useState(
    fakeMembers.sort((a, b) => (a.userPoints < b.userPoints ? 1 : -1))
  );
  React.useEffect(() => {
    UserAPI.getall().then((res) => {
      setSortedList(res.data);
    });
  }, []);

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
                      {member.Firstname}
                    </div>
                    <div className="TransferManagerModal-LastName">
                      {member.Lastname}
                    </div>
                    <button
                      className="TransferManagerModal-SetManagerButton"
                      onClick={() => {
                        handleCancel();
                        let id = store.getState().state.id;
                        console.log(event);
                        EventAPI.Transfer(event, member.id).then((res) => {
                          setReload(!reload);
                        });
                      }}
                    >
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
