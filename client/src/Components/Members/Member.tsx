import React from "react";
import "../../CSS/Members/Member.css";

interface IProps {
    username: string;
}

function Member({ username }: IProps) {
  return (
    <div className="Member">
      <button className="Member-Name">{username}</button>
    </div>
  );
}

export default Member;
