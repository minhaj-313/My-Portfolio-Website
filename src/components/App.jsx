import "/src/styles/app.scss"
import React, {useEffect, useState} from 'react'
import {useData} from "/src/providers/DataProvider.jsx"
import Portfolio from "/src/components/Portfolio.jsx"
import {AnimatedCursor} from "/src/components/feedbacks/AnimatedCursor"
import ActivitySpinner from "/src/components/feedbacks/ActivitySpinner.jsx"
import ImageCache from "/src/components/generic/ImageCache.jsx"
import YoutubeModal from "/src/components/modals/YoutubeModal.jsx"
import GalleryModal from "/src/components/modals/GalleryModal.jsx"
import Notifications from "/src/components/feedbacks/Notifications.jsx"
import ConfirmationWindow from "/src/components/modals/ConfirmationWindow.jsx"
import {useFeedbacks} from "/src/providers/FeedbacksProvider.jsx"

function App() {
    const {listImagesForCache} = useData()

    const imageList = listImagesForCache()

    return (
        <div className={`app-wrapper`}>
            <AppFeedbacks/>
            <ImageCache urls={imageList}/>
            <Portfolio/>
        </div>
    )
}

function AppFeedbacks() {
    const {listSpinnerActivities, isAnimatedCursorEnabled, displayingNotification, displayingYoutubeVideo, displayingGallery, pendingConfirmation} = useFeedbacks()

    return (
        <>
            {listSpinnerActivities() && (<ActivitySpinner/>)}
            {isAnimatedCursorEnabled() && (<AnimatedCursor/>)}
            {displayingNotification && (<Notifications/>)}
            {displayingYoutubeVideo && (<YoutubeModal/>)}
            {displayingGallery && (<GalleryModal/>)}
            {pendingConfirmation && (<ConfirmationWindow/>)}
        </>
    )
}

export default App
