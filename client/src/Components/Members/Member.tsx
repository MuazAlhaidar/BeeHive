import React from "react";
import "../../CSS/Members/Member.css";

interface IProps {
  Firstname: string;
  Lastname: string;
}

function Member({ Firstname, Lastname }: IProps) {
  return (
    <div className="Member">
      <button className="Member-Name">
        {Firstname} {Lastname}
      </button>
    </div>
  );
}

export default Member;
