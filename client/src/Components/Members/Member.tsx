import React from "react";
import "../../CSS/Members/Member.css";

interface IProps {
  name: string;
}

function Member({ name }: IProps) {
  return (
    <div className="Member">
      <button className="Member-Name">{name}</button>
    </div>
  );
}

export default Member;
