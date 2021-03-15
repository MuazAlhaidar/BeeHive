import React from "react";
import GroupsList from "../Components/Groups/GroupsList";
import GroupForm from "../Components/Groups/GroupsForm";
import MemberList from "../Components/Members/MemberList";
import EmailModal from "../Components/EmailModal";
import MemberModal from "../Components/Members/MemberModal";
import GroupsEdit from "../Components/Groups/GroupsEdit";
import ConfirmationModal from "../Components/ConfirmationModal";
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

function MyGroups(props: { id: any }) {
  const emptyMembersList = new Array<MemberInfo>(
    { id: 1, username: "John" },
    { id: 2, username: "Ham" },
    { id: 3, username: "Clam" },
    { id: 4, username: "Sam" },
    { id: 5, username: "Dave" }
  );
  const fakeMembersList = new Array<MemberInfo>(
    { id: 1, username: "John" },
    { id: 2, username: "Ham" },
    { id: 3, username: "Clam" },
    { id: 4, username: "Sam" }
  );

  const [groups, setGroups] = React.useState(Array<GroupInfo>());
  const [groupIndex, setGroupIndex] = React.useState(0);
  const [showMembersEditModal, setShowMembersEditModal] = React.useState(false);
  const [showEmailModal, setShowEmailModal] = React.useState(false);
  const [showGroupEditModal, setShowGroupEditModal] = React.useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = React.useState(
    false
  );
  const [curGroup, setCurGroup] = React.useState({
    name: "",
    contactInfo: "",
  });

  const toggleMemberModal = () => {
    setShowMembersEditModal(!showMembersEditModal);
  };

  const toggleEmailModal = () => {
    setShowEmailModal(!showEmailModal);
  };

  const toggleGroupEditModal = () => {
    setShowGroupEditModal(!showGroupEditModal);
  };

  const toggleConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  React.useEffect(() => {
    reload(props.id).then((res) => {
      setGroups(res);
    });
  }, []);

  const selectGroup = (i: number) => {
    let index = i === undefined ? 0 : i;
    setGroupIndex(index);
    i === undefined
      ? setCurGroup({
          name: "",
          contactInfo: "",
        })
      : setCurGroup({
          name: groups[index].name,
          contactInfo: groups[index].contactInfo,
        });
  };

  const addGroup = (name: string, contactInfo: string, members: any) => {
    API.newGroup(props.id, name, contactInfo).then((res) => {
      const g = groups.slice();
      let id = props.id;
      g.push({ id, name, contactInfo, members });
      setGroups(g);
      setGroupIndex(groups.length);
      setCurGroup({
        name: name,
        contactInfo: contactInfo,
      });
      console.log(res);
    });
  };

  const editGroup = (name: string, contactInfo: string) => {
    if (groups[groupIndex] !== undefined) {
      API.updateGroup(props.id, groups[groupIndex].id, name, contactInfo).then(
        (res) => {
          const g = groups.slice();
          g[groupIndex].name = name;
          g[groupIndex].contactInfo = contactInfo;
          setGroups(g);
          setCurGroup({
            name: groups[groupIndex].name,
            contactInfo: groups[groupIndex].contactInfo,
          });
          console.log(res);
        }
      );
    }
  };

  const removeGroup = (i: number) => {
    if (groups[groupIndex] !== undefined)
      API.removeGroup(props.id, groups[groupIndex].id).then((res) => {
        const g = groups.slice();
        g.splice(i, 1);
        setGroups(g);
        setGroupIndex(-1);
        setCurGroup({
          name: "",
          contactInfo: "",
        });
        console.log(res);
      });
  };

  return (
    <div className="MyGroups">
      <EmailModal showModal={showEmailModal} setShowModal={setShowEmailModal} />
      <GroupsEdit
        showModal={showGroupEditModal}
        setShowModal={setShowGroupEditModal}
        editGroup={editGroup}
        curGroup={curGroup}
        setCurGroup={setCurGroup}
      />
      <ConfirmationModal
        showModal={showConfirmationModal}
        setShowModal={setShowConfirmationModal}
        removeFunction={() => {
          removeGroup(groupIndex);
        }}
      />
      {groupIndex > groups.length - 1 || groupIndex < 0 ? (
        <MemberModal
          allMembers={emptyMembersList}
          memberList={fakeMembersList}
          showModal={showMembersEditModal}
          setShowModal={setShowMembersEditModal}
        />
      ) : (
        <MemberModal
          allMembers={emptyMembersList}
          memberList={groups[groupIndex].members}
          showModal={showMembersEditModal}
          setShowModal={setShowMembersEditModal}
        />
      )}
      <div className="MyGroups-GroupList">
        <GroupsList
          groupList={groups}
          selectGroup={selectGroup}
          addGroup={addGroup}
        />
      </div>
      <div className="MyGroups-GroupForm">
        {groupIndex > groups.length - 1 || groupIndex < 0 ? (
          <GroupForm
            name={""}
            contactInfo={""}
            removeGroup={() => {
              removeGroup(groupIndex);
            }}
            toggleEmailModal={toggleEmailModal}
            toggleGroupEditModal={toggleGroupEditModal}
            toggleConfirmationModal={toggleConfirmationModal}
          />
        ) : (
          <GroupForm
            name={groups[groupIndex].name}
            contactInfo={groups[groupIndex].contactInfo}
            removeGroup={() => {
              removeGroup(groupIndex);
            }}
            toggleEmailModal={toggleEmailModal}
            toggleGroupEditModal={toggleGroupEditModal}
            toggleConfirmationModal={toggleConfirmationModal}
          />
        )}
      </div>
      <div className="MyGroups-MemberList">
        {groupIndex > groups.length - 1 || groupIndex < 0 ? (
          <MemberList
            memberList={fakeMembersList}
            toggleMemberModal={toggleMemberModal}
          />
        ) : (
          <MemberList
            memberList={groups[groupIndex].members}
            toggleMemberModal={toggleMemberModal}
          />
        )}
      </div>
    </div>
  );
}

export default MyGroups;
