import { UserContext } from "../hooks/UserContext"
import { auth } from "./utils"

const SigninEvent = () => {
    const userContext = UserContext()
    const dispatch = userContext.dispatch
    auth.onAuthStateChanged((user) => {
        if (user) {
            dispatch({type:'signin',payload:true})
          } else {
            dispatch({type:'signin',payload:false})
          }
    })
}

export default SigninEvent