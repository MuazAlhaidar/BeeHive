import React from "react";
import GroupsList from "../Components/Groups/GroupsList";
import GroupForm from "../Components/Groups/GroupsForm";
import MemberList from "../Components/Members/MemberList";
import "../CSS/Groups/MyGroups.css";
import * as API from "../api/Groups"

interface MemberInfo {
    username: string;
    id: number
}

interface GroupInfo {
    id: number;
    name: string;
    contactInfo: string;
    members: Array<MemberInfo>;
}

// async function reload(id:number){
async function reload(id:number):Promise<Array<GroupInfo>>{
    const data = await API.getGroup(id)
    const groups = data.data.groups.reduce(function(acc:any, cur:any){
        let tmp = {id:cur.id, name: cur.Name, contactInfo:cur.ContactInfo, members: []}
        if(acc[cur.id]===undefined)
            acc[cur.id]=tmp
        return acc
    }, {})
    data.data.groupmembers.forEach((i:any)=>{
        groups[i.groupid].members.push(i)
    })
    return Object.values(groups)

    

}

function MyGroups() {
    const fakeGroup = Array<GroupInfo>(
        {
            id: 1,
            name: "HR Group",
            contactInfo: "313-995-7488",
            members: [{ id:0, username: "John" }, { id:0, username: "Thomas" }],
        },
        {
            id: 2,
            name: "PR Group",
            contactInfo: "313-555-6598",
            members: [{ id:0, username: "John" }],
        }
    );

    const emptyMembersList = new Array<MemberInfo>();

    const [groups, setGroups] = React.useState(fakeGroup);
    const [groupIndex, setGroupIndex] = React.useState(0);

    React.useEffect(()=>{
        reload(2).then(res=> {
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
        members: any
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
