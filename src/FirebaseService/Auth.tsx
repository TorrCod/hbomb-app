import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FirebaseConfig";


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
  });
  return isLogin
}