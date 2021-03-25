import React from "react";
import "../CSS/TransferManagerModal.css";
import * as UserAPI  from  "../api/User" 
import *  as EventAPI  from   "../api/Event"
import {store} from "../store"

interface MemberInfo {
  id: number;
  firstname: string;
  lastname: string;
  points: number;
}

interface IProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  setReload: any;
  reload: any;
  event: any;
}

function TransferManagerModal({ showModal, setShowModal, reload, setReload, event }: IProps) {
  const fakeMembers = Array<MemberInfo>(
    { id: -1, firstname: "", lastname: "", points: 0 },
  );

  const [sortedList, setSortedList] = React.useState(
    fakeMembers.sort((a, b) => (a.points < b.points ? 1 : -1))
  );
  React.useEffect(()=>{
          UserAPI.getall()
          .then(res=>{
                  setSortedList(res)
          })
          
  },[])

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
                          <button className="TransferManagerModal-SetManagerButton" onClick={() => {
                                  handleCancel()
                                  let id = store.getState().state.id
                                  EventAPI.Transfer(event, member.id,   id )
                                  .then(res=>{
                                          setReload(!reload);  
                                  })
                                  }}>
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
