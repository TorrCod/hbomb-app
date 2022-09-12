import {initializeApp} from "firebase/app"
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyB902lKg4FLhCtOPcHrghCozN0Eb-trpWk",
//     authDomain: "localhost",
//     projectId: "hbomb-d8887",
//     storageBucket: "hbomb-d8887.appspot.com",
//     messagingSenderId: "631381399409",
//     appId: "1:631381399409:web:37d18b5b316472a32b08d0",
//     measurementId: "G-81P1KGZMC9",
//     databaseUrl:"https://hbomb-d8887-default-rtdb.firebaseio.com",
// };

const firebaseConfig = {
    apiKey: "AIzaSyB902lKg4FLhCtOPcHrghCozN0Eb-trpWk",
    authDomain: "hbomb-d8887.firebaseapp.com",
    databaseURL: "https://hbomb-d8887-default-rtdb.firebaseio.com",
    projectId: "hbomb-d8887",
    storageBucket: "hbomb-d8887.appspot.com",
    messagingSenderId: "631381399409",
    appId: "1:631381399409:web:37d18b5b316472a32b08d0",
    measurementId: "G-81P1KGZMC9"
};

const firebaseApp = initializeApp(firebaseConfig);
export const cloudStorage = getStorage(firebaseApp);
export const database = getDatabase(firebaseApp);
export const googleAnalytics = getAnalytics(firebaseApp);
export const auth = getAuth(firebaseApp)

if (window.location.hostname === "localhost") {
    connectDatabaseEmulator(database, "localhost", 9000);
    connectStorageEmulator(cloudStorage, "localhost", 9199);
    connectAuthEmulator(auth, "http://localhost:9099");
}

export default firebaseApp;