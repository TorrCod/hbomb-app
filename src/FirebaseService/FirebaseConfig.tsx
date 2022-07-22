import {initializeApp} from "firebase/app"
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB902lKg4FLhCtOPcHrghCozN0Eb-trpWk",
    authDomain: "localhost",
    projectId: "hbomb-d8887",
    storageBucket: "hbomb-d8887.appspot.com",
    messagingSenderId: "631381399409",
    appId: "1:631381399409:web:37d18b5b316472a32b08d0",
    measurementId: "G-81P1KGZMC9",
    databaseUrl:"https://hbomb-d8887-default-rtdb.firebaseio.com",
};
const firebaseApp = initializeApp(firebaseConfig);
export const cloudStorage = getStorage(firebaseApp);
export const database = getDatabase(firebaseApp);


export default firebaseApp;