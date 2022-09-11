
import { createContext, useContext } from "react"
export type userModalCtx = {
    visible:boolean
    setVisible:(c: boolean) => void
}
export const MyUserModalCtx = createContext<userModalCtx>({
    visible:false,
    setVisible:(c: boolean) => {}
})
export const useUserModalCtx = () => useContext(MyUserModalCtx)