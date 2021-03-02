import React from "react";
import GroupsList from "../Components/Groups/GroupsList";
import GroupForm from "../Components/Groups/GroupsForm";
import MemberList from "../Components/Members/MemberList";
import "../CSS/Groups/MyGroups.css";
import * as API from "../api/Groups";

interface MemberInfo {
  username: string;
  id: number;
}

interface GroupInfo {
  id: number;
  name: string;
  contactInfo: string;
  members: Array<MemberInfo>;
}

const props = { id: 2 };

async function reload(id: number): Promise<Array<GroupInfo>> {
  const data = await API.getGroup(id);
  const groups = data.data.groups.reduce(function (acc: any, cur: any) {
    let tmp = {
      id: cur.id,
      name: cur.Name,
      contactInfo: cur.ContactInfo,
      members: [],
    };
    if (acc[cur.id] === undefined) acc[cur.id] = tmp;
    return acc;
  }, {});
  data.data.groupmembers.forEach((i: any) => {
    groups[i.groupid].members.push(i);
  });
  return Object.values(groups);
}

function MyGroups() {
  const emptyMembersList = new Array<MemberInfo>();

  const [groups, setGroups] = React.useState(Array<GroupInfo>());
  const [groupIndex, setGroupIndex] = React.useState(0);

  React.useEffect(() => {
    reload(props.id).then((res) => {
      setGroups(res);
    });
  }, []);

  const selectGroup = (i: number) => {
    let index = i === undefined ? 0 : i;
    setGroupIndex(index);
  };

  const addGroup = (name: string, contactInfo: string, members: any) => {
    API.newGroup(props.id, name, contactInfo).then((res) => {
      const g = groups.slice();
      let id = props.id;
      g.push({ id, name, contactInfo, members });
      setGroups(g);
      console.log(res);
    });
  };

  const editGroup = (name: string, contactInfo: string) => {
    if (groups[groupIndex] != undefined) {
      API.updateGroup(props.id, groups[groupIndex].id, name, contactInfo).then(
        (res) => {
          const g = groups.slice();
          g[groupIndex].name = name;
          g[groupIndex].contactInfo = contactInfo;
          setGroups(g);
          console.log(res);
        }
      );
    }
  };

  const removeGroup = (i: number) => {
    API.removeGroup(props.id, groups[groupIndex].id).then((res) => {
      const g = groups.slice();
      g.splice(i, 1);
      setGroups(g);
      setGroupIndex(groups.length);
      console.log(res);
    });
  };

  return (
    <div className="MyGroups">
      <div className="MyGroups-GroupList">
        <GroupsList
          groupList={groups}
          selectGroup={selectGroup}
          addGroup={addGroup}
        />
      </div>
      <div className="MyGroups-GroupForm">
        {groupIndex > groups.length - 1 ? (
          <GroupForm
            name={""}
            contactInfo={""}
            editGroup={editGroup}
            removeGroup={() => {
              removeGroup(groupIndex);
            }}
          />
        ) : (
          <GroupForm
            name={groups[groupIndex].name}
            contactInfo={groups[groupIndex].contactInfo}
            editGroup={editGroup}
            removeGroup={() => {
              removeGroup(groupIndex);
            }}
          />
        )}
      </div>
      <div className="MyGroups-MemberList">
        {groupIndex > groups.length - 1 ? (
          <MemberList memberList={emptyMembersList} />
        ) : (
          <MemberList memberList={groups[groupIndex].members} />
        )}
      </div>
    </div>
  );
}

export default MyGroups;
