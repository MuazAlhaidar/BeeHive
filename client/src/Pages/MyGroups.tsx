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
  // id: number;
  name: string;
  contactInfo: string;
  members: Array<MemberInfo>;
}

async function reload(id:number){
        const mygroups = await API.getGroup(id)
        // const groups =  mygroups.data.groups.map((i:any)=>{
        //         return {id:i.id, name: i.Name, contactInfo:i.ContactInfo, members: null}
        // })
        const groups = mygroups.data.groups.reduce(function(acc:any, cur:any){
                if(acc[cur.id]===undefined)
                        acc[cur.id]=[cur]
                else
                        acc[cur.id].push(cur)
                return acc
        }, {})
        mygroups.data.groupmembers.forEach((i:any)=>{
                groups[i[0].Group].members =  i
        })
        return groups

    

}

function MyGroups() {
  const fakeGroup = Array<GroupInfo>(
    {
      name: "HR Group",
      contactInfo: "313-995-7488",
      members: [{ name: "John" }, { name: "Thomas" }],
    },
    {
      name: "PR Group",
      contactInfo: "313-555-6598",
      members: [{ name: "John" }],
    }
  );
  React.useEffect(()=>{
          reload(2)
          .then(res=>{
                  console.log(res)
          })
  }, [])

  const emptyMembersList = new Array<MemberInfo>();

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
