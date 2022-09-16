import { get, push, ref, set } from "firebase/database";
import { database } from "./FirebaseConfig";

export const writeDatabase = async (path: Path, itemToWrite: {}) => {
    const dbRef = ref(database, path);
    await set(dbRef, itemToWrite);
}

export const pushItemKey = (path: Path) => {
    const postListRef = ref(database, path);
    const newPostRef = push(postListRef);
    return newPostRef.key;
}

export const clearPath = async (path: Path) => {
    await writeDatabase(path, {})
}

export const readData = async (path: ReadPath) => {
    const dbRef = ref(database, path);
    const readedData = (await get(dbRef)).val()
    return readedData
}

type Path = 'productlandingpage/' | 'users/' | string;
type ReadPath = 'productlandingpage'
    | 'users'
    | 'onlineshop-category'
    | 'onlineshop-items'
    | 'offer-data'
    | 'user-visited'
    | 'model-data'
    | 'classic-data'
    | 'collection-data'
    ;