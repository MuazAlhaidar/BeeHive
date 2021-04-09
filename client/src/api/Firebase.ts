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
function getid(value:{id:string, data:()=>any}){
        let tmp = value.data()
        tmp["id"]=value.id
        return tmp
}
export async function query(collection, queryTerm=undefined, query=undefined){
        const ref = Fire.default.firestore().collection(collection)
        if(queryTerm!==undefined){
                return ref.where(queryTerm, "==", query).get()
        }
        else{
                return ref.get()
        }

}
export async function newDoc(collection, entry,queryTerm=undefined  ){
        const ref = Fire.default.firestore().collection(collection)
        let result = query(collection, entry, queryTerm)
        /*
        if(queryTerm!==undefined){
                let find = await ref.where(queryTerm, "==",entry[queryTerm]).get()
                .then((documentSnapshot: any) => {
                        // If the document already exists then fail
                        // console.log(queryTerm, entry[queryTerm])
                        if (documentSnapshot.size!=0) {
                                return genMessage(
                                        -1,
                                        "This Event already exists. \n Please enter a new Name."
                                );
                        }
                        else {
                                return true; 
                        }
                });

                if (find === true) {
                        // If the event does not exist
                        return ref
                        .doc() // We use a title as the ID for an event
                        .set(entry)
                        .then((res: any) => genMessage(entry["queryTerm"], "Made a new "+collection))
                        .catch((err: any) => genMessage(err, "Failed to make a "+collection));
                } else return find;
        }
        else{
                // If the event does not exist
                return ref
                .doc() // We use a title as the ID for an event
                .set(entry)
                .then((res: any) => genMessage(entry["queryTerm"], "Made a new "+collection))
                .catch((err: any) => genMessage(err, "Failed to make a "+collection));
        }
        */
       return result


}

export async function updateDoc(collection, entry, id, queryTerm=undefined){
        const ref = Fire.default.firestore().collection(collection)
        if(queryTerm!==undefined){
                let find = await ref.where(queryTerm, "==", entry[queryTerm]).get()
                .then((documentSnapshot: any) => {
                        // If the document already exists then fail
                        // console.log(queryTerm, entry[queryTerm])
                        if (documentSnapshot.size!=0) {
                                return genMessage(
                                        -1,
                                        "This Event already exists. \n Please enter a new Name."
                                );
                        }
                        else {
                                return true; 
                        }
                });

                if (find === true) {
                        // If the event does not exist
                        return ref
                        .doc(id) 
                        .update(entry)
                        .then((res: any) => genMessage(entry["queryTerm"], "Update a new "+collection))
                        .catch((err: any) => genMessage(err, "Failed to update a "+collection));
                } else return find; 
        }
        else{
                // If the event does not exist
                return ref
                .doc(id) 
                .update(entry)
                .then((res: any) => genMessage(entry["queryTerm"], "Update a new "+collection))
                .catch((err: any) => genMessage(err, "Failed to update a "+collection));
        }

}
export async function getDoc(collection, queryTerm=undefined, query=""){
        const ref = Fire.default.firestore().collection(collection)
        if(queryTerm===undefined){
                ref.where(queryTerm, "==", query).get()
                .then((documentSnapshot: any) => {
                        return genMessage(
                                documentSnapshot.docs.map((x:any)=>getid),
                                        "Got all stuff")
                })
        }
        else{
                return ref.get().then((res:any)=>{
                        return res.docs.map((x:any)=> getid(x))
                })

        }
}

export async function subquery(collection, subcollection, subterm:string, subqueryTerm=undefined, queryTerm=undefined, cquery=undefined){
        let main = await  query(collection, queryTerm, cquery)
        let tmp= Promise.all(main.docs.map((doc:any)=> { 
                let data = doc.data()
                return Promise.all( data[subterm].map(async (single)=>{
                        // console.log(subcollection, subqueryTerm, single)
                        return query(subcollection, subqueryTerm, single)
                }))
        }))
}

export async function update(collection, id, obj){
        const ref = Fire.default.firestore().collection(collection)
        return ref.doc(id).update(obj)

}
