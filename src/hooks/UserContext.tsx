import { createContext, useContext, useReducer } from "react";
import { auth } from "../api/utils";
// import { GlobalContext } from "./GlobalContext";

export type _UserStateType = {
    UserState:{
        checkCredential:boolean
        isLoading:boolean
    }
}

type _UserStateAction = 
|{type:'signin',payload:boolean}
|{type:'loadingdone',payload:boolean}


const  _UserState_init = {
    UserState:{
        checkCredential: (auth.currentUser)?true:false,
        isLoading:false
    }
}

export function userReducer(state:_UserStateType,action: _UserStateAction):_UserStateType {

    switch(action.type){
        case 'signin':
            return {
                ...state,
                UserState:{
                    ...state.UserState,
                    checkCredential:action.payload
                }
            };
        case 'loadingdone':
            return {
                ...state,
                UserState:{
                    ...state.UserState,
                    isLoading:action.payload
                }
            };
        
    }
}

type _UserState_Content = {
    loadingDone :(payload:boolean) => void
    state:_UserStateType
    dispatch:React.Dispatch<_UserStateAction>
}

const _UserState_Content_init = {
    loadingDone :() =>{},
    state:_UserState_init,
    dispatch:() => {}
}

export const useUserContext = createContext<_UserState_Content>(_UserState_Content_init)

export const UserProvider = ({children}:any) => {
    const [state, dispatch] = useReducer(userReducer,_UserState_init)

    const loadingDone = (payload:boolean) => dispatch({type:'loadingdone',payload:!payload})

    const value = {
        loadingDone,
        state,
        dispatch
    }
    return <useUserContext.Provider value={value}>{children}</useUserContext.Provider>
}

export const UserContext = () => useContext(useUserContext)