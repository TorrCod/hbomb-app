import {initializeApp} from "firebase/app"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes, listAll, deleteObject} from "firebase/storage";
import { RcFile } from "antd/lib/upload";
import { _imageData} from "./CustomType";

export const firebaseConfig = {
  apiKey: "AIzaSyB902lKg4FLhCtOPcHrghCozN0Eb-trpWk",
  authDomain: "localhost",
  projectId: "hbomb-d8887",
  storageBucket: "hbomb-d8887.appspot.com",
  messagingSenderId: "631381399409",
  appId: "1:631381399409:web:37d18b5b316472a32b08d0",
  measurementId: "G-81P1KGZMC9"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const cloudStorage = getStorage(app);

export const uploadToCloud = async (uploadFile:_imageData,path:string) => {
  // check bucket images if exist on new imageData file:
  await deleteImages(path,uploadFile)
  // upload image now
  await uploadImages(path,uploadFile)
}

export const SignIn = async (email:string,password:string) => {
  let isLogin:boolean = true
  interface logObject {
    [key:string]:any;
  }
  let firebaseLog:logObject = [];

  await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  const user = userCredential.user;
  firebaseLog.user = user
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    firebaseLog.errorCode = errorCode;
    firebaseLog.user = errorMessage
    isLogin = false
    
  console.log("error occured , isLogin? " + isLogin);
  });
  console.log(firebaseLog);
  return isLogin
}
export const ButtonHandle = {
    carousel : {
        next : (state: number,imageData: string | any[]) => {
            if (state === imageData.length - 1){
            return 0
            }
            else {
            return state+1;
            }
        },
        previous : (state: number, imageData: string | any[]) => { 
            if (state === 0){
              return imageData.length - 1
            }
            else {
              return state-1
            }
        }
    }
}
export const onSwipe = (onSwipeLocation: { start: any; end: any; }, nextSlide: { (): void; (): void; }, previousSlide: { (): void; (): void; })=> {
  const swipeDirection = onSwipeLocation.start - onSwipeLocation.end;
  if (swipeDirection > 0){
    nextSlide();
  }
  if (swipeDirection < 0){
    previousSlide();
  }
}
export const getBase64 = (file: RcFile): Promise<any> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  }
);

const deleteImages = async (path:string,file:_imageData) => {
  for (const key in file) {
    if(file[key as keyof _imageData]!.length){
      const storageRef = ref(cloudStorage,path+"/");
      const imageRef = (await listAll(storageRef)).items
      const itemNameList:string[] = []

      for (const iterator of file[key as keyof _imageData]!) {
        itemNameList.push(iterator.name)
      }

      
      for (const iterator of imageRef) {
        const isExistOnBucket = itemNameList.includes(iterator.name);
        
        if(!isExistOnBucket) {
          await deleteObject(iterator).then((itemDeleted) => {
            
          })
        };
      }
    }
  }
}

const uploadImages = async(path:string, file:_imageData) => {
  
  for (const key in file) {
    
    if(file[key as keyof _imageData]!.length){
      
      const storageRef = ref(cloudStorage,path+"/");
      const imageRef = (await listAll(storageRef)).items
      const itemNameList:string[] = []

      for (const iterator of imageRef) {
        itemNameList.push(iterator.name)
      }
      
      for (const iterator of file[key as keyof _imageData]!) {
        const isExistOnBucket = itemNameList.includes(iterator.name)
        
        if(!isExistOnBucket){
          const storageRef = ref(cloudStorage,path+"/"+iterator.name);
          await uploadBytes(storageRef,iterator.originFileObj)
        }
      }
    }
  }
}

