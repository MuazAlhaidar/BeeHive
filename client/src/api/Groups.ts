import { Fire } from "./config.js";
import "firebase/auth";
import "firebase/firestore";

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
async function newGroup(name: string, description: string) {
  let find = await Fire.firestore()
    .collection("Groups-WEB")
    .doc(name)
    .get()
    .then((documentSnapshot: any) => {
      if (documentSnapshot.exists) {
        return genMessage(
          -1,
          "This Group already exists. \n Please enter a new Name."
        );
      } else {
        return true;
      }
    });

  if (find === true) {
    return Fire.firestore()
      .collection("Groups-WEB")
      .doc()
      .set({ name, description, members: [] })
      .then((res: any) => genMessage(res, "Made a new group"))
      .catch((err: any) => genMessage(err, "Failed to make group"));
  } else return find;
}

async function removeGroup(name: string) {
  return Fire.firestore()
    .collection("Groups-WEB")
    .doc(name)
    .delete()
    .then((res: any) => genMessage(res, "Deleted"))
    .catch((res: any) => genMessage(res, "Failed to delete gorup"));
}
async function updateGroup(name: string, description: string) {
  let find = await Fire.firestore()
    .collection("Groups-WEB")
    .doc(name)
    .get()
    .then((documentSnapshot: any) => {
      if (documentSnapshot.exists) {
        return genMessage(
          -1,
          "This Group already exists. \n Please enter a new Name."
        );
      } else {
        return true;
      }
    });
  if (find === true) {
    return Fire.firestore()
      .collection("Groups-WEB")
      .doc(name)
      .update({
        name,
        description,
      })
      .then((res: any) => genMessage(res, "Updated group"))
      .catch((res: any) => genMessage(res, "Failed to Updated evnet"));
  } else {
    return find;
  }
}

async function setMembers(name: string, members: string[]) {
  return Fire.firestore()
    .collection("Groups-WEB")
    .doc(name)
    .update({
      members,
    })
    .then((res: any) => genMessage(res, "Added people in groups"))
    .catch((res: any) => genMessage(res, "Failed to add people to groups"));
}

async function getMembers(name: string) {
  let users = await Fire.firestore().collection("Groups-WEB").doc(name).get();
  let data = (await users.data()) as any;
  let promises = data["members"].map(async (user: any) => {
    let tmp = await Fire.firestore().collection("Users-WEB").doc(user).get();
    return tmp.data();
  });
  return Promise.all(promises)
    .then((res: any) => genMessage(res, "All members for a group"))
    .catch((err: any) =>
      genMessage(err, "Failed to get all members for a group")
    );
}

async function email(name: string, subject: string, body: string) {
  return Fire.firestore()
    .collection("Groups-WEB")
    .doc(name)
    .get()
    .then((res: any) => {
      let data = res.data();
      // return Fire.firestore().collection("User-WEB").where("user", "in",
    })
    .catch((err: any) =>
      genMessage(false, "Failed to get people from a group")
    );
}

export {
  getGroups,
  newGroup,
  removeGroup,
  updateGroup,
  setMembers,
  getMembers,
  email,
};
