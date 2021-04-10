// import {newDoc, updateDoc, getDoc, query, getDocsSub, update } from "./Firebase"
import {login, newUser} from "./User";
import {newEvent, updateEvent, getAllEvents, deleteEvent, transferEvent, getEventsForManager} from "./Event";
// newUser("ahmedzakariya355@gmail.com", "passpass", "Zaki", "Ahmed")
// login("ahmedzakariya355@gmail.com", "passpass")

getEventsForManager("graphinetime@gmail.com")
.then(res=>{
        console.log(res)
})

.catch(res=>{
        console.log(res)
})
