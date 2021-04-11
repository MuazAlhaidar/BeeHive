import { Fire } from "./config.js";
import * as FireAPI from "./Firebase";
import * as Interface from "../Interfaces" 
import {getallUsers} from "./User"
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
        let allgroups = await FireAPI.getDocUser("Groups-WEB", "members",undefined,undefined)
        let users = await  getallUsers()
        return {groups:allgroups, users:users.data}
}

async function newGroup(name: string, description: string) {
    let tmp= await FireAPI.newDoc("Events-WEB", {
            name:name,
            description:description
      })
      tmp["data"] as Interface.GroupInfo;
      return tmp
}

async function deleteGroup(name: string) {
  return (
    Fire.default
      .firestore()
      .collection("Groups-WEB")
      .doc(name)
      // Using the document name as ID
      // Find the group and Delete it
      .delete()
      .then((res: any) => genMessage(res, "Deleted the group"))
      .catch((res: any) => genMessage(res, "Failed to delete gorup"))
  );
}

async function updateGroup(id:string, name: string, description: string) {
        return FireAPI.updateDoc("Groups-WEB", {
        name: name,
        description: description,
      }, id)
}

async function setGroupMembers(GroupName: string, members: string[]) {
  // Bulk set the members of a group
  console.log(members)
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

// async function getGroupMembers(GroupName: string) {
//   // Get the group's fields first
//   let group = await Fire.default
//     .firestore()
//     .collection("Groups-WEB")
//     .doc(GroupName)
//     .get();
//   let data = (await group.data()) as any;
//   // Get all members of a group
//   let promises = data["members"].map(async (user: any) => {
//     let tmp = await Fire.default
//       .firestore()
//       .collection("Users-WEB")
//       .doc(user)
//       .get();
//     return tmp.data();
//   });
//   return Promise.all(promises)
//     .then((res: any) => genMessage(res, "All members for a group"))
//     .catch((err: any) =>
//       genMessage(err, "Failed to get all members for a group")
//     );
// }

// TODO Emailing
async function email(name: string, subject: string, body: string) {
  return Fire.default
    .firestore()
    .collection("Groups-WEB")
    .doc(name)
    .get()
    .then((res: any) => {
      // let data = res.data();
      // return Fire.default.firestore().collection("User-WEB").where("user", "in",
    })
    .catch((err: any) =>
      genMessage(false, "Failed to get people from a group")
    );
}

export {
  getAllGroups,
  newGroup,
  deleteGroup,
  updateGroup,
  setGroupMembers,
  // getGroupMembers,
  email,
};
