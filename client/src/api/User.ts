import { Fire } from "./config.js";
import "firebase/auth";
import "firebase/firestore";

// TODO FIX INTERHIPJIO
// Fire.initializeApp(config);
interface Message {
  data: any;
  msg: string | number;
}

function genMessage(_data: any, _msg: any) {
  return { msg: _msg, data: _data };
}

async function login(email: string, password: string): Promise<Message> {
  // Take in user login credentials and authenticate them
  return Fire.default
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (res: any) => {
      return Fire.default
        .firestore()
        .collection("Users-WEB")
        .doc(email)
        .get()
        .then((res: any) => {
          return genMessage(res.data(), "success");
        });
    })
    .catch((res: any) => genMessage(false, "failed to login"));
}

async function newUser(
  email: string,
  password: string,
  firstname: string,
  lastname: string
): Promise<Message> {
  return Fire.default
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res: any) => {
      return Fire.default
        .firestore()
        .collection("User-WEB")
        .doc(email)
        .get()
        .then((snapshot: any) => {
          // Only add the user if the user does not already exist
          if (!snapshot.exists) {
            let user = {
              firstname: firstname,
              lastname: lastname,
              email: email,
              points: 0,
              isowner: false,
            };
            Fire.default
              .firestore()
              .collection("Users-WEB")
              .doc(email)
              .set(user);
            return genMessage(user, "Success");
          } else {
            return genMessage(1, "User already exists");
          }
        })
        .catch((err: any) => genMessage(3, "Failed to login"));
    })
    .catch((err: any) => genMessage(2, "User already exists"));
}

async function resetPassword(email: string): Promise<Message> {
  return Fire.default
    .auth()
    .sendPasswordResetEmail(email)
    .then((res: any) => genMessage(true, "Reset password email sent"))
    .catch((res: any) => genMessage(false, "Failed to send password"));
}

async function getallUsers(): Promise<Message> {
  return Fire.default
    .firestore()
    .collection("Users-WEB")
    .get()
    .then((res: any) =>
      // Get all of the users in the database
      // for points adustments and the leaderboard
      genMessage(
        res.docs.map((x: any) => x.data()),
        "All Members"
      )
    )
    .catch((res: any) => res);
}

// TODO We are gonna have alot of problems with this
// the old email will become the new email which
// means that we can no longer find the user if
// their email has changed since we cant change IDs
async function changeEmail(
  oldemail: any,
  newemail: string
): Promise<Message | undefined> {
  var user = Fire.default.auth().currentUser;
  return user
    ?.updateEmail(newemail)
    .then(() => {
      return Fire.default
        .firestore()
        .collection("User-WEB")
        .doc(oldemail)
        .update({ email: newemail })
        .then(() => genMessage(true, "Changed email"))
        .catch((error: any) =>
          genMessage(false, "Couldn't change email," + error)
        );
    })
    .catch((error: any) => genMessage(false, "Couldn't change email," + error));
}

export { login, newUser, resetPassword, getallUsers, changeEmail };
