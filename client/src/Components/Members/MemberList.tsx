import React from "react";
import "../../CSS/Members/MemberList.css";

import Member from "./Member";

interface MemberMeme {
    username: string;
}

interface IProps {
  memberList: Array<MemberMeme>;
}

function MemberList({ memberList }: IProps) {
  const members = memberList;

  return (
    <div>
      <div className="MemberList-Top">
        <label className="MemberList-MemberListLabel">Members</label>
        <button className="MemberList-DeleteButton">x</button>
        <button className="MemberList-AddButton">+</button>
      </div>
      <div>
        {members.map((curMember) => {
          return <Member username={curMember.username} />;
        })}
      </div>
    </div>
  );
}

export default MemberList;
