import {firebase} from "./config.js"

// TODO FIX INTERHIPJIO
// firebase.initializeApp(config);
interface Message{
        data:any,
        msg:string|number
}

function genMessage(_data:any,_msg:any){
        return {msg:_msg, data:_data}
}
async function login(email:string, password:string):Promise<Message>{
        const cityRef = firebase.firestore().collection('Users').doc('moniera@umich.edu');
        const doc = await cityRef.get();
        return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async res=>{ 
                return firebase.firestore()
                .collection('Users')
                .doc(email)
                .get()
                .then(re2=> {
                        return genMessage(re2.data(), "success")
                })
        })
        .catch(res=>genMessage(false, "failed to login") )
}
async function new_user(email:string,  password:string, fName:string, lName:string):Promise<Message>{
        // async function new_user(email,  password, fName, lName){
        return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res=>{ 
                return firebase.firestore().collection("Users").doc(email).get()
                .then((snapshot)=>{
                        if(!snapshot.exists){
                                let user={FirstName: fName, LastName: lName, email: email, userPoints: 0,}
                                firebase.firestore().collection('Users').doc(email).set(user)
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
        return firebase.auth().sendPasswordResetEmail(_email)
        .then(res=>genMessage(true, "Reset password email sent"))
        .catch(res=>genMessage(false, "Failed to send password"))
}
async function getall():Promise<Message>{
        return firebase.firestore().collection("Users").get()
        .then(res=>res.docs.map(x=> x.data()))
        .catch(res=>res)
}
async function changeemail(oldemail:any, newemail:string):Promise<Message|undefined>{
        var user = firebase.auth().currentUser;
        return user?.updateEmail(newemail)
        .then( () =>{
                return firebase.firestore().collection("Users").doc(oldemail).update({email:newemail})
                .then(()=>  genMessage(true, "Changed email"))
                .catch( (error) => genMessage(false, "Coudln't change email,"+ error) );
        })
        .catch( (error) => genMessage(false, "Coudln't change email,"+ error) );
}



export {login, new_user, reset_password, getall, changeemail}
