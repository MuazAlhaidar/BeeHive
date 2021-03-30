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
  const cityRef = Fire.firestore()
    .collection("Users-WEB")
    .doc("moniera@umich.edu");
  const doc = await cityRef.get();
  return Fire.auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (res: any) => {
      return Fire.firestore()
        .collection("Users-WEB")
        .doc(email)
        .get()
        .then((re2: any) => {
          return genMessage(re2.data(), "success");
        });
    })
    .catch((res: any) => genMessage(false, "failed to login"));
}
async function new_user(
  email: string,
  password: string,
  fName: string,
  lName: string
): Promise<Message> {
  // async function new_user(email,  password, fName, lName){
  return Fire.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res: any) => {
      return Fire.firestore()
        .collection("User-WEB")
        .doc(email)
        .get()
        .then((snapshot: any) => {
          if (!snapshot.exists) {
            let user = {
              FirstName: fName,
              LastName: lName,
              email: email,
              userPoints: 0,
            };
            Fire.firestore().collection("Users-WEB").doc(email).set(user);
            return genMessage(user, "Success");
          } else {
            return genMessage(1, "User already exists");
          }
        })
        .catch((err: any) => genMessage(3, "Failed to login"));
    })
    .catch((err: any) => genMessage(2, "User already exists"));
}
async function reset_password(_email: string): Promise<Message> {
  return Fire.auth()
    .sendPasswordResetEmail(_email)
    .then((res: any) => genMessage(true, "Reset password email sent"))
    .catch((res: any) => genMessage(false, "Failed to send password"));
}
async function getall(): Promise<Message> {
  return Fire.firestore()
    .collection("User-WEB")
    .get()
    .then((res: any) => res.docs.map((x: any) => x.data()))
    .catch((res: any) => res);
}
async function changeemail(
  oldemail: any,
  newemail: string
): Promise<Message | undefined> {
  var user = Fire.auth().currentUser;
  return user
    ?.updateEmail(newemail)
    .then(() => {
      return Fire.firestore()
        .collection("User-WEB")
        .doc(oldemail)
        .update({ email: newemail })
        .then(() => genMessage(true, "Changed email"))
        .catch((error: any) =>
          genMessage(false, "Coudl't change email," + error)
        );
    })
    .catch((error: any) => genMessage(false, "Coudln't change email," + error));
}

export { login, new_user, reset_password, getall, changeemail };
