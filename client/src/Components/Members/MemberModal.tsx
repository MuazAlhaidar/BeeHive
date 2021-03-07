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
          var retme= true
          memberList.forEach(i => {
                  if(i.id == value.id){
                          retme=false
                  }
          });
          return retme
        
  }

  let _tmp = allMembers.filter(isInGroup);
  console.log(_tmp);

  const [filteredList, setFilteredList] = React.useState(_tmp);
  // const [filteredList, setFilteredList] = React.useState([{id:1, username:"DIO"}]);
  // console.log(allMembers.filter(isInGroup));

  console.log(memberList);
  console.log(allMembers);
  console.log(filteredList);

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
