import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {config} from "./config.js"
firebase.initializeApp(config);
const db = firebase.firestore()
const auth = firebase.auth()
interface Message{
        data:any,
        msg:string|number
}
function genMessage(_data:any,_msg:any){ return {msg:_msg, data:_data}}
function testFunc(args, func){
        func(args).then(res=>{console.log(res)}).catch(res=>{console.log(res)})
}
async function login(email:string, password:string):Promise<Message>{
        const cityRef = db.collection('Users').doc('moniera@umich.edu');
        const doc = await cityRef.get();
        return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async res=>{ 
                return db
                .collection('Users')
                .doc(email)
                .get()
                .then(re2=> {
                        return genMessage(re2.data(), "success")
                })
        })
        .catch(res=>genMessage(false, "failed to login") )
}
async function new_user(email,  password, fName, lName):Promise<Message>{
        // async function new_user(email,  password, fName, lName){
        return auth.createUserWithEmailAndPassword(email, password)
        .then(res=>{ 
                return db.collection("Users").doc(email).get()
                .then((snapshot)=>{
                        if(!snapshot.exists){
                                let user={FirstName: fName, LastName: lName, email: email, userPoints: 0,}
                                db.collection('Users').doc(email).set(user)
                                return genMessage(user, "Success")
                        }
                        else{
                                return genMessage(1, "User already exists")
                        }
                })
                .catch(err=>genMessage(3, "Failed to login"))
        })
        .catch(err=>genMessage(2, "User already exists"))
}
async function reset_password(_email:string):Promise<Message>{
        return auth.sendPasswordResetEmail(_email)
        .then(res=>genMessage(true, "Reset password email sent"))
        .catch(res=>genMessage(false, "Failed to send password"))
}
async function getall():Promise<Message>{
        return db.collection("Users").get()
        .then(res=>res.docs.map(x=> x.data()))
        .catch(res=>res)
}
async function changeemail(email:any):Promise<Message>{
        var user = firebase.auth().currentUser;
        return user.updateEmail(email)
        .then( () =>{
                return genMessage(true, "Changed email")
        })
        .catch( (error) =>{
                return genMessage(false, "Coudln't change email,"+ error)
        });
}
export {login, new_user, reset_password, getall, changeemail}
