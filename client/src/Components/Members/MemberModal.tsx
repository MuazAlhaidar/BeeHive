import React from "react";
import Member from "./Member";

import "../../CSS/Members/MemberModal.css";

interface MemberInfo {
  username: string;
  id: number;
}

interface IProps {
  allMembers: Array<MemberInfo>;
  memberList: Array<MemberInfo>;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

function MemberModal({
  allMembers,
  memberList,
  showModal,
  setShowModal,
}: IProps) {
  function isInGroup(value: MemberInfo, index: number, array: MemberInfo[]) {
    let retme = true;
    memList.forEach((m) => {
      if (m.id === value.id) {
        retme = false;
      }
    });
    return retme;
  }

  const [memList, setMemList] = React.useState(memberList);
  let filteredList = allMembers.filter(isInGroup);

  const handleSave = () => {
    setShowModal(!showModal);
  };

  const handleCancel = () => {
    setShowModal(!showModal);
  };

  const addToGroup = (member: MemberInfo) => {
    const m = memList.slice();
    m.push(member);
    setMemList(m);
  };

  const removeFromGroup = (index: number) => {
    const m = memList.slice();
    m.splice(index, 1);
    setMemList(m);
  };

  return (
    <div>
      {showModal ? (
        <div className="MemberModal-Background">
          <div className="MemberModal">
            <div className="MemberModal-Topbar">Member Manager</div>
            <div className="MemberModal-CatagoryLabels">
              <div>Not In Group</div>
              <div>In Group</div>
            </div>
            <div className="MemberModal-Body">
              <div className="MemberModal-NotInGroup">
                {!Array.isArray(filteredList) || !filteredList.length
                  ? null
                  : filteredList.map((curMem: MemberInfo, index: number) => {
                      return (
                        <div className="MemberModal-NotInGroupMembers">
                          <div className="MemberModal-MemberDiv">
                            <Member username={curMem.username} />
                          </div>
                          <button
                            className="MemberModal-AddButton"
                            onClick={() => {
                              console.log(curMem);
                              addToGroup(curMem);
                            }}
                          >
                            +
                          </button>
                        </div>
                      );
                    })}
              </div>
              <div className="MemberModal-InGroup">
                {!Array.isArray(memberList) || !memberList.length
                  ? null
                  : memList.map((curMem: MemberInfo, index: number) => {
                      return (
                        <div className="MemberModal-InGroupMembers">
                          <div className="MemberModal-MemberDiv">
                            <Member username={curMem.username} />
                          </div>
                          <button
                            className="MemberModal-RemoveButton"
                            onClick={() => {
                              removeFromGroup(index);
                            }}
                          >
                            x
                          </button>
                        </div>
                      );
                    })}
              </div>
            </div>
            <div className="MemberModal-Buttons">
              <button
                className="MemberModal-LightButton"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button className="MemberModal-DarkButton" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MemberModal;
