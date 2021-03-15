import React from "react";
import GroupsList from "../Components/Groups/GroupsList";
import GroupForm from "../Components/Groups/GroupsForm";
import MemberList from "../Components/Members/MemberList";
import EmailModal from "../Components/EmailModal";
import MemberModal from "../Components/Members/MemberModal";
import GroupsEdit from "../Components/Groups/GroupsEdit";
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

function MyGroups(props:{id:any} ) {
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

		const toggleMemberModal = () => {
				setShowMembersEditModal(!showMembersEditModal);
		};

		const toggleEmailModal = () => {
				setShowEmailModal(!showEmailModal);
		};

		const toggleGroupEditModal = () => {
				setShowGroupEditModal(!showGroupEditModal);
		};

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
				if (groups[groupIndex] !== undefined) {
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
				if (groups[groupIndex] !== undefined)
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
						<EmailModal showModal={showEmailModal} setShowModal={setShowEmailModal} />
						<GroupsEdit
        showModal={showGroupEditModal}
        setShowModal={setShowGroupEditModal}
        editGroup={editGroup}
						/>
						{groupIndex > groups.length - 1 ? (
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
						{groupIndex > groups.length - 1 ? (
								<GroupForm
								name={""}
								contactInfo={""}
								removeGroup={() => {
										removeGroup(groupIndex);
								}}
								toggleEmailModal={toggleEmailModal}
								toggleGroupEditModal={toggleGroupEditModal}
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
										/>
						)}
				</div>
						<div className="MyGroups-MemberList">
						{groupIndex > groups.length - 1 ? (
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
