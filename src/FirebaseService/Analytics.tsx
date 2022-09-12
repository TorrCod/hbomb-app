import React from 'react'
import { googleAnalytics } from './FirebaseConfig'
import { logEvent } from 'firebase/analytics'

export const UserVisitLogEvent = () => {
    logEvent(googleAnalytics,'page_view',{'page_path':window.location.pathname})
}
