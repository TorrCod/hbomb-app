import { push, ref, set } from "firebase/database";
import { database } from "./FirebaseConfig";

export const writeDatabase = (path:path,itemToWrite:{}) => {
    console.log('writing now');
    const dbRef = ref(database,path);
    set(dbRef,itemToWrite).then((response) => {
        console.log(response);
    })
}

export const pushItemKey  = (path:path) => {
    const postListRef = ref(database,path);
    const newPostRef = push(postListRef);
    return  newPostRef.key;
}

type path = 'productlandingpage/'|'users/'|string