import { Fire } from "./config.js";
import "firebase/auth";
import "firebase/firestore";

export interface Message {
  data: any;
  msg: string | number;
}

export function genMessage(_data: any, _msg: any) {
  return { msg: _msg, data: _data };
}

export function getid(value: { id: string; data: () => any }) {
  let tmp = value.data();
  tmp["id"] = value.id;
  return tmp;
}

export async function query(
  collection: string,
  queryTerm: string | undefined = undefined,
  query: string | undefined = undefined
) {
  const ref = Fire.default.firestore().collection(collection);
  if (queryTerm !== undefined) {
    return ref.where(queryTerm, "==", query).get();
  } else {
    return ref.get();
  }
}

export async function newDoc(
  collection: string,
  entry: any,
  queryTerm: string | undefined = undefined
) {
  const ref = Fire.default.firestore().collection(collection);
  function makeDoc(entry: any) {
    return ref
      .add(entry)
      .then((res: any) => {
        let ret = entry;
        ret["id"] = res.id;
        return genMessage(ret, "Made a new " + collection);
      })
      .catch((err: any) => genMessage(false, "Failed to make a " + collection));
  }
  if (queryTerm === undefined) {
    return makeDoc(entry);
  } else {
    let result = await query(collection, queryTerm, entry[queryTerm]);
    if (result.size > 0) {
      return genMessage(
        false,
        collection +
          "  already exist for value " +
          queryTerm +
          " which is " +
          entry[queryTerm]
      );
    } else {
      return makeDoc(entry);
    }
  }
}

export async function updateDoc(
  collection: string,
  entry: any,
  id: string,
  queryTerm: string | undefined = undefined
) {
  const ref = Fire.default.firestore().collection(collection);
  function updateDoc(id: any, entry: any) {
    return ref
      .doc(id)
      .update(entry)
      .then((res: any) => genMessage(true, "Updated " + collection))
      .catch((err: any) => genMessage(err, "Failed to update a " + collection));
  }
  if (queryTerm === undefined) {
    return updateDoc(id, entry);
  } else {
    let result = await query(collection, queryTerm, entry[queryTerm]);
    if (result.size > 0) {
      // Because we could be updating a key value that already exists,
      // we have to check for this
      let found = result.docs.map((x) => getid(x))[0];
      if (found.id === id) {
        return updateDoc(id, entry);
      } else {
        return genMessage(
          false,
          collection + " already exist for value " + queryTerm
        );
      }
    } else {
      return updateDoc(id, entry);
    }
  }
}

export async function getDoc(
  collection: string,
  queryTerm: string | undefined = undefined,
  cquery: string | undefined = ""
) {
  function getALLdocs(res: any) {
    return genMessage(
      res.docs.map((x: any) => getid(x)),
      "Got documents for " + collection + " that matches" + cquery
    );
  }
  let result = await query(collection, queryTerm, cquery);
  return getALLdocs(result);
}

export async function getDocUser(
  collection: string,
  subterm: string,
  queryTerm: any,
  cquery: any
) {
  const usercol = "Users-WEB";
  const userref = Fire.default.firestore().collection(usercol);
  let docs = await query(collection, queryTerm, cquery);
  return Promise.all(
    docs["docs"].map(async (x) => {
      let tmp = getid(x);
      let foundusers = await Promise.all(
        x.get(subterm).map(async (user: any) => {
          let userdata = await userref.doc(user).get();
          userdata = getid(await userref.doc(user).get());
          return userdata;
        })
      );
      tmp[subterm] = foundusers;
      return tmp;
    })
  );
}

export async function updateField(collection: string, id: string, obj: any) {
  const ref = Fire.default.firestore().collection(collection);
  return genMessage(
    await ref.doc(id).update(obj),
    "Updated " + collection + "/" + id
  );
}

export async function deleteDoc(collection: string, id: string) {
  const ref = Fire.default.firestore().collection(collection);
  return genMessage(
    await ref.doc(id).delete(),
    "Delete " + collection + "/" + id
  );
}
