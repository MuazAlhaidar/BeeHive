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
import { store, redux_index, redux_rsvp } from "../store";
import { MemberInfo, GroupInfo } from "../Interfaces";

// async function reload(id: number): Promise<Array<GroupInfo>> {
async function reload(id: number): Promise<any> {
  const data = await API.getGroup(id);
  return data.data;
}

function MyGroups(props: { id: number }) {
  const fakeMembersList = new Array<string>();

  const [allMembers, setAllMembers] = React.useState(new Array<string>());

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
    contactInfo: "",
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
    m[index].members = memberList;
    setGroups(m);
  };

  const resetGroupAndMemList = () => {
    setCurGroup({
      name: "",
      contactInfo: "",
    });
    setMemList(Array<string>());
  };

  const setGroupAndMemList = (i: number) => {
    setCurGroup({
      name: groups[i].name,
      contactInfo: groups[i].description,
    });
    setMemList(groups[i].members);
  };

  React.useEffect(() => {
    reload(props.id).then((res) => {
      setGroups(res.groups);
      console.log(res.users);
      setAllMembers(res.users);
    });
  }, []);

  const selectGroup = (i: number) => {
    let index = i === undefined ? 0 : i;
    setGroupIndex(index);
    store.dispatch(redux_index(i));
    store.dispatch(redux_rsvp(groups[i].id));
    // store.dispatch(redux_index(index))
    i === undefined ? resetGroupAndMemList() : setGroupAndMemList(index);
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
      setMemList(members);
    });
  };

  const editGroup = (name: string, contactInfo: string) => {
    if (groups[groupIndex] !== undefined) {
      API.updateGroup(props.id, groups[groupIndex].id, name, contactInfo).then(
        (res) => {
          const g = groups.slice();
          g[groupIndex].name = name;
          g[groupIndex].description = contactInfo;
          setGroups(g);
          setCurGroup({
            name: groups[groupIndex].name,
            contactInfo: groups[groupIndex].description,
          });
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
          allMembers={allMembers}
          memberList={fakeMembersList}
          setMemberList={setMemList}
          showModal={showMembersEditModal}
          setShowModal={setShowMembersEditModal}
          setMembers={set_groupmembers}
        />
      ) : (
        <MemberModal
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
            contactInfo={groups[groupIndex].description}
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
