import React from "react";
import "../CSS/TransferManagerModal.css";
import * as UserAPI from "../api/User";
import * as EventAPI from "../api/Event";
// import { store } from "../store";
import { MemberInfo } from "../Interfaces";
import { store} from "../store";

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
    id: "0",
    firstname: "",
    lastname: "",
    email: "",
    points: 0,
    isowner: false,
  });
  const state = store.getState().state.id

  const [sortedList, setSortedList] = React.useState(
          fakeMembers.filter((x:any)=>(x.id!=state)).sort((a, b) => (a.points < b.points ? 1 : -1))
                            );
  React.useEffect(() => {
    UserAPI.getallUsers().then((res) => {
      setSortedList(res.data.filter((x:any)=>(x.id!=state)));
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
                      {member.firstname}
                    </div>
                    <div className="TransferManagerModal-LastName">
                      {member.lastname}
                    </div>
                    <button
                      className="TransferManagerModal-SetManagerButton"
                      onClick={() => {
                        handleCancel();
                        // let id = store.getState().state.id;
                        console.log(event, member.id);
                        EventAPI.transferEvent(event, member.id).then(
                          (res) => {
                            setReload(!reload);
                          }
                        );
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
