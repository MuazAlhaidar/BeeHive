// import {newDoc, updateDoc, getDoc, query, getDocsSub, update } from "./Firebase"
import {login} from "./User";
import {newEvent, updateEvent, getAllEvents, deleteEvent} from "./Event";
// login("ahmedzakariya355@gmail.com", "passpass")
login("graphinetime@gmail.com", "passpass")
.then(()=>{
        deleteEvent("yCzznetKiEUW2qyp2Wfh")
        .then(res=>{
                console.log(res)


        })

        .catch(res=>{
                console.log(res)
        })
})
