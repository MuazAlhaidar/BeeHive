import React from "react";
import "../../CSS/Groups/GroupsList.css";
import Group from "./Group";
import GroupsAdd from "./GroupsAdd";

interface GroupInfo {
  name: string;
  contactInfo: string;
}

interface IProps {
  groupList: Array<GroupInfo>;
  selectGroup: (i: number) => void;
  addGroup: (name: string, contactInfo: string, members: null) => void;
}

function GroupsList({ groupList, selectGroup, addGroup }: IProps) {
  const groups = groupList;

  const [showModal, setShowModal] = React.useState(false);

  const toggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <GroupsAdd
        addGroup={addGroup}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div className="GroupList-Top">
        <button className="GroupList-AddButton" onClick={toggle}>
          +
        </button>
      </div>
      {groups.map((curGroup, index) => {
        return (
          <Group
            key={`group-${index}`}
            name={curGroup.name}
            index={index}
            selectGroup={selectGroup}
          />
        );
      })}
    </div>
  );
}

export default GroupsList;
