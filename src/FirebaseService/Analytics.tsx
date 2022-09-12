import React from 'react'
import { googleAnalytics } from './FirebaseConfig'
import { logEvent } from 'firebase/analytics'

export const StartAnalytics = ()=>{
    const viewersCount = logEvent(googleAnalytics,'screen_view')
    
}
