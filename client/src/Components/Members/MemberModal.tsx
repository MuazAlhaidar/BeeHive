import React from "react";
import Member from "./Member";

import "../../CSS/Members/MemberModal.css";

interface MemberInfo {
  username: string;
  id: number;
}

interface IProps {
  allMembers: Array<MemberInfo> | any;
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
  const isInGroup = (
    member: MemberInfo,
    index: number,
    array: Array<MemberInfo>
  ) => {
    return memberList.includes(member);
  };

  let filteredList = allMembers.filter(isInGroup);

  const handleSave = () => {
    setShowModal(!showModal);
  };

  const handleCancel = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      {showModal ? (
        <div className="MemberModal-Background">
          <div className="MemberModal">
            <div className="MemberModal-Topbar">Member Manager</div>
            <div className="MemberModal-CatagoryLabels">
              <div>In Group</div>
              <div>Not In Group</div>
            </div>
            <div className="MemberModal-Body">
              <div className="MemberModal-InGroup">
                {!Array.isArray(memberList) || !memberList.length
                  ? null
                  : memberList.map((curMem: MemberInfo, index: number) => {
                      return <Member username={curMem.username} />;
                    })}
              </div>
              <div className="MemberModal-NotInGroup">
                {!Array.isArray(filteredList) || !filteredList.length
                  ? null
                  : filteredList.map((curMem: MemberInfo, index: number) => {
                      return <Member username={curMem.username} />;
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
