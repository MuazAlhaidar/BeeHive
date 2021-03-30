import { Fire } from "./config.js";
import "firebase/auth";
import "firebase/firestore";
var chance = require("chance").Chance();
interface Message {
  data: any;
  msg: string | number;
}
function genMessage(_data: any, _msg: any) {
  return { msg: _msg, data: _data };
}

async function getGroups() {
  return Fire.firestore()
    .collection("Groups-WEB")
    .get()
    .then((res: any) =>
      genMessage(
        res.docs.map((x: any) => x.data()),
        "Success"
      )
    )
    .catch((err: any) => genMessage(err, "Failed to get groups"));
}
async function newGroup(name: string, info: string) {
  return Fire.firestore()
    .collection("Groups-WEB")
    .doc()
    .set({ description: info, name: name, members: [] })
    .then((res: any) => genMessage(res, "Made a new group"))
    .catch((err: any) => genMessage(err, "Failed to make group"));
}

async function removeGroup(id: string) {
  return Fire.firestore()
    .collection("Groups-WEB")
    .doc(id)
    .delete()
    .then((res: any) => genMessage(res, "Deleted"))
    .catch((res: any) => genMessage(res, "Failed to delete gorup"));
}
async function updateGroup(id: string, name: string, desc: string) {
  return Fire.firestore()
    .collection("Groups-WEB")
    .doc(id)
    .update({
      description: desc,
      name: name,
    })
    .then((res: any) => genMessage(res, "Updated group"))
    .catch((res: any) => genMessage(res, "Failed to Updated evnet"));
}
async function setMembers(id: string, users: string[]) {
  return Fire.firestore()
    .collection("Groups-WEB")
    .doc(id)
    .update({
      members: users,
    })
    .then((res: any) => genMessage(res, "Added pepole in groups"))
    .catch((res: any) => genMessage(res, "Failed to add people to gruops"));
}
async function email(id: string, subject: string, body: string) {
  return Fire.firestore()
    .collection("Groups-WEB")
    .doc(id)
    .get()
    .then((res: any) => {
      let data = res.data();
      // return Fire.firestore().collection("User-WEB").where("user", "in",
    })
    .catch((err: any) =>
      genMessage(false, "Failed to get people from a group")
    );
}

// testme(["gGy1stZTCEU0EF4zleZc", "WOW", "his sucks"], email)

export { getGroups, newGroup, removeGroup, updateGroup, setMembers, email };
// export {axiosGet, axiosPost, getGroup, newGroup, removeGroup, updateGroup, addmembers, removemembers, email, setMembers}
