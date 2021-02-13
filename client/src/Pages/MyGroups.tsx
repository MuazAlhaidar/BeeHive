import React from "react";
import GroupsList from "../Components/Groups/GroupsList";
import GroupForm from "../Components/Groups/GroupsForm";
import MemberList from "../Components/Members/MemberList";
import "../CSS/Groups/MyGroups.css";
import * as API from "../api/Groups"

interface MemberInfo {
  name: string;
}

interface GroupInfo {
  id: number;
  name: string;
  contactInfo: string;
  members: Array<MemberInfo>;
}

async function reload(id:number){
        const data = await API.getGroup(id)
        const groups = data.data.groups.reduce(function(acc:any, cur:any){
                let tmp = {id:cur.id, name: cur.Name, contactInfo:cur.ContactInfo, members: []}
                if(acc[cur.id]===undefined)
                        acc[cur.id-1]=tmp
                return acc
        }, new Array(data.data.groups.length))
        data.data.groupmembers.forEach((i:any)=>{
                groups[i[0].Group-1].members =  i
        })
        return groups

    

}

function MyGroups() {
  const fakeGroup = Array<GroupInfo>(
    {
    id: 1,
      name: "HR Group",
      contactInfo: "313-995-7488",
      members: [{ name: "John" }, { name: "Thomas" }],
    },
    {
    id: 2,
      name: "PR Group",
      contactInfo: "313-555-6598",
      members: [{ name: "John" }],
    }
  );

  const emptyMembersList = new Array<MemberInfo>();

  const [groups, setGroups] = React.useState(fakeGroup);
  const [groupIndex, setGroupIndex] = React.useState(0);

  React.useEffect(()=>{
          reload(2).then(res=> {
                  console.log(res)
                  setGroups(res)
          })
  }, [])

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
    let id=0
    g.push({id, name, contactInfo, members });
    setGroups(g);
  };

  const editGroup = (name: string, contactInfo: string) => {
    if (groups[groupIndex] != undefined) {
      const g = groups.slice();
      g[groupIndex].name = name;
      g[groupIndex].contactInfo = contactInfo;
      setGroups(g);
    }
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
