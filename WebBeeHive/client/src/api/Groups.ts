import { Fire } from "./config.js";
import * as FireAPI from "./Firebase";
import * as Interface from "../Interfaces";
import { getallUsers } from "./User";
import "firebase/auth";
import "firebase/firestore";

interface Message {
  data: any;
  msg: string | number;
}

function genMessage(_data: any, _msg: any) {
  return { msg: _msg, data: _data };
}

async function getAllGroups() {
  let allgroups = await FireAPI.getDocUser(
    "Groups-WEB",
    "members",
    undefined,
    undefined
  );
  let users = await getallUsers();
  return { groups: allgroups, users: users.data };
}

async function newGroup(name: string, description: string) {
  let tmp = await FireAPI.newDoc("Groups-WEB", {
    name: name,
    description: description,
    members: [],
  });
  tmp["data"] as Interface.GroupInfo;
  return tmp;
}

async function deleteGroup(id: string) {
  return (
    Fire.default
      .firestore()
      .collection("Groups-WEB")
      .doc(id)
      // Using the document ID
      // Find the group and Delete it
      .delete()
      .then((res: any) => genMessage(res, "Deleted the group"))
      .catch((res: any) => genMessage(res, "Failed to delete gorup"))
  );
}

async function updateGroup(id: string, name: string, description: string) {
  return FireAPI.updateDoc(
    "Groups-WEB",
    {
      name: name,
      description: description,
    },
    id
  );
}

async function setGroupMembers(GroupName: string, members: string[]) {
  // Bulk set the members of a group
  return Fire.default
    .firestore()
    .collection("Groups-WEB")
    .doc(GroupName)
    .update({
      members,
    })
    .then((res: any) => genMessage(res, "Added people in groups"))
    .catch((res: any) => genMessage(res, "Failed to add people to groups"));
}

export { getAllGroups, newGroup, deleteGroup, updateGroup, setGroupMembers };
