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
import { store, redux_index, redux_group } from "../store";
import { MemberInfo, GroupInfo } from "../Interfaces";

// async function reload(id: number): Promise<Array<GroupInfo>> {
async function reload(): Promise<any> {
  const data = await API.getAllGroups();
  return data.data;
}

function MyGroups() {
  const emptyMembersList = new Array<string>();
  const emptyGroup = {} as GroupInfo;

  const [allMembers, setAllMembers] = React.useState(new Array<MemberInfo>());
  const [groups, setGroups] = React.useState(Array<GroupInfo>());
  const [groupIndex, setGroupIndex] = React.useState(-1);
  const [showMembersEditModal, setShowMembersEditModal] = React.useState(false);
  const [showEmailModal, setShowEmailModal] = React.useState(false);
  const [showGroupEditModal, setShowGroupEditModal] = React.useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = React.useState(
    false
  );
  const [curGroup, setCurGroup] = React.useState({
    name: "",
    description: "",
  });
  const [memList, setMemList] = React.useState(Array<string>());
  console.log(groups);

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

  const set_groupmembers = (memberList: Array<string>, index: number) => {
    const m = groups.slice();
    m[index].members = memberList.map((x) => x);
    setGroups(m);
  };

  const resetGroupAndMemList = () => {
    setCurGroup({
      name: "",
      description: "",
    });
    setMemList(Array<string>());
  };

  const setGroupAndMemList = (i: number) => {
    setCurGroup({
      name: groups[i].name,
      description: groups[i].description,
    });
    setMemList(groups[i].members);
  };

  React.useEffect(() => {
    reload().then((res) => {
      setGroups(res.groups);
      setAllMembers(res.users);
    });
  }, []);

  const selectGroup = (i: number) => {
    let index = i === undefined ? 0 : i;
    setGroupIndex(index);
    store.dispatch(redux_index(i));
    store.dispatch(redux_group(groups[i].name));
    i === undefined ? resetGroupAndMemList() : setGroupAndMemList(index);
  };

  const addGroup = (name: string, description: string, members: any) => {
    API.newGroup(name, description).then((res) => {
      const g = groups.slice();
      g.push({ name, description, members });
      setGroups(g);
      setGroupIndex(groups.length);
      setCurGroup({
        name: name,
        description: description,
      });
      setMemList(members);
    });
  };

  const editGroup = (name: string, description: string) => {
    if (groups[groupIndex] !== undefined) {
      API.updateGroup(name, description).then((res) => {
        const g = groups.slice();
        g[groupIndex].name = name;
        g[groupIndex].description = description;
        setGroups(g);
        setCurGroup({
          name: groups[groupIndex].name,
          description: groups[groupIndex].description,
        });
      });
    }
  };

  const removeGroup = (i: number) => {
    if (groups[groupIndex] !== undefined)
      API.deleteGroup(groups[groupIndex].name).then((res) => {
        const g = groups.slice();
        g.splice(i, 1);
        setGroups(g);
        setGroupIndex(-1);
        resetGroupAndMemList();
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
          groupID={""}
          allMembers={allMembers}
          memberList={emptyMembersList}
          setMemberList={setMemList}
          showModal={showMembersEditModal}
          setShowModal={setShowMembersEditModal}
          setMembers={set_groupmembers}
        />
      ) : (
        <MemberModal
          groupID={groups[groupIndex].name}
          allMembers={allMembers}
          memberList={memList}
          setMemberList={setMemList}
          showModal={showMembersEditModal}
          setShowModal={setShowMembersEditModal}
          setMembers={set_groupmembers}
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
            group={emptyGroup}
            toggleEmailModal={toggleEmailModal}
            toggleGroupEditModal={toggleGroupEditModal}
            toggleConfirmationModal={toggleConfirmationModal}
          />
        ) : (
          <GroupForm
            group={groups[groupIndex]}
            toggleEmailModal={toggleEmailModal}
            toggleGroupEditModal={toggleGroupEditModal}
            toggleConfirmationModal={toggleConfirmationModal}
          />
        )}
      </div>
      <div className="MyGroups-MemberList">
        {groupIndex > groups.length - 1 || groupIndex < 0 ? (
          <MemberList groupId={""} toggleMemberModal={toggleMemberModal} />
        ) : (
          <MemberList
            groupId={groups[groupIndex].name}
            toggleMemberModal={toggleMemberModal}
          />
        )}
      </div>
    </div>
  );
}

export default MyGroups;
