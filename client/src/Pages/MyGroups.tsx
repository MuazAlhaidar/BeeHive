import React from "react";
import GroupList from "../Components/Groups/GroupsList";
import GroupForm from "../Components/Groups/GroupsForm";
import MemberList from "../Components/Members/MemberList";
import "../CSS/Groups/MyGroups.css";

interface MemberInfo {
  name: string;
}

interface GroupInfo {
  name: string;
  contactInfo: string;
  members: Array<MemberInfo>;
}

function MyGroups() {
  const fakeGroup = Array<GroupInfo>(
    {
      name: "HR Group",
      contactInfo: "313-995-7488",
      members: [{ name: "john" }, { name: "Thomas" }],
    },
    {
      name: "PR Group",
      contactInfo: "313-555-6598",
      members: [{ name: "john" }],
    }
  );

  const [groups, setGroups] = React.useState(fakeGroup);
  const [groupIndex, setGroupIndex] = React.useState(0);

  const selectGroup = (i: number) => {
    let index = i === undefined ? 0 : i;
    setGroupIndex(index);
  };

  const addGroup = (
    name: string,
    contactInfo: string,
    members: Array<MemberInfo>
  ) => {
    const g = groups.slice();
    g.push({ name, contactInfo, members });
    setGroups(g);
  };

  const removeGroup = (i: number) => {
    const g = groups.slice();
    g.splice(i, 1);
    setGroups(g);
    setGroupIndex(groups.length);
  };

  return (
    <div className="MyGroups">
      <div className="MyGroups-GroupList">
        <GroupList />
      </div>
      <div className="MyGroups-GroupForm">
        <GroupForm />
      </div>
      <div className="MyGroups-MemberList">
        <MemberList />
      </div>
    </div>
  );
}

export default MyGroups;
