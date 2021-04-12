import React from "react";
import "../../CSS/Groups/Group.css";

interface IProps {
  index: number;
  name: string;
  selectGroup: (i: number) => void;
}

function Group({ name, index, selectGroup }: IProps) {
  return (
    <div className="Group">
      <button
        className="Group-Button"
        onClick={() => {
          selectGroup(index);
        }}
      >
        {name}
      </button>
    </div>
  );
}

export default Group;
