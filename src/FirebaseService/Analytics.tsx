import React from 'react'
import { googleAnalytics as analytics } from './FirebaseConfig'
import { logEvent } from 'firebase/analytics'

export const UserVisitLogEvent = () => {
    // logEvent(analytics,'page_view',{'page_path':window.location.pathname})
    console.log('logging events');
    logEvent(analytics, 'screen_view');
}
