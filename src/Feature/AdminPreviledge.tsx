import React from "react";
import { UserContext } from "../hooks/UserContext";

const AdminPreviledge = ({children}: type_AdminPre) => {
    const isLogin = UserContext().state.UserState.checkCredential;
    
    return ((isLogin)?
    <>
        {children}
    </>
    :<></>)
}
type type_AdminPre = {
    children:React.ReactNode;
}

export default AdminPreviledge;