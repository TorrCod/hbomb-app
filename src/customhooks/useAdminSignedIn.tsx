import { useEffect, useState } from 'react'
import { UserContext } from '../hooks/UserContext'

export const useAdminSignedin = () => {
    const [isAdminSignedIn, setIsAdminSignedIn] = useState(false)

    const checkCredential = UserContext().state.UserState.checkCredential

    useEffect(() => {
      setIsAdminSignedIn(checkCredential)
    }, [checkCredential])
    
    return isAdminSignedIn
}
