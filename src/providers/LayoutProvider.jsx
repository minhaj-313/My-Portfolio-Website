import React, {createContext, useContext, useEffect, useState} from 'react'
import {useUtils} from "/src/helpers/utils.js"
import {useData} from "/src/providers/DataProvider.jsx"
const LayoutContext = createContext(null)
export const useLayout = () => useContext(LayoutContext)

const BREAKPOINT_VALUES = {
    xxs: 0,
    xs: 360,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
}

const TIMEOUT_STEP_IN_SECONDS = 0.1
let timeoutId = -1

export const LayoutProvider = ({children}) => {
    const utils = useUtils()
    const {getSettings} = useData()

    const [ongoingActivities, setOngoingActivities] = useState([])
    const [animatedCursorEnabled, setAnimatedCursorEnabled] = useState(true)
    const [canHaveAnimatedCursor, setCanHaveAnimatedCursor] = useState(false)
    const [didCreateListeners, setDidCreateListeners] = useState(false)
    const [displayingNotification, setDisplayingNotification] = useState(null)
    const [displayingYoutubeVideo, setDisplayingYoutubeVideo] = useState(null)
    const [displayingGallery, setDisplayingGallery] = useState(null)
    const [pendingConfirmation, setPendingConfirmation] = useState(null)

    const [scrollX, setScrollX] = useState(0)
    const [scrollY, setScrollY] = useState(0)
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const [innerHeight, setInnerHeight] = useState(window.innerHeight)
    const [currentTimeSpan, setCurrentTimeSpan] = useState(0)

    const settings = getSettings()

    useEffect(() => {
        setCanHaveAnimatedCursor(!utils.isTouchDevice() && settings["animatedCursorEnabled"])
        _createListeners()

        return () => {
            _destroyListeners()
        }
    }, [])

    const showActivitySpinner = (activityId, message) => {
        if(ongoingActivities.find(activity => activity.id === activityId))
            return

        const data = { id: activityId, message: message }
        setOngoingActivities(prevActivities => [...prevActivities, data])
    }

    const hideActivitySpinner = (activityId) => {
        setOngoingActivities(prevActivities =>
            prevActivities.filter(activity => activity.id !== activityId)
        )
    }

    const toggleAnimatedCursorStatus = () => {
        setAnimatedCursorEnabled(!animatedCursorEnabled)
    }

    const isBreakpoint = (breakpoint) => {
        return innerWidth >= BREAKPOINT_VALUES[breakpoint]
    }

    const getBreakpoint = () => {
        const width = innerWidth
        if (width < BREAKPOINT_VALUES.sm) return 'xs'
        if (width < BREAKPOINT_VALUES.md) return 'sm'
        if (width < BREAKPOINT_VALUES.lg) return 'md'
        if (width < BREAKPOINT_VALUES.xl) return 'lg'
        if (width < BREAKPOINT_VALUES.xxl) return 'xl'
        return 'xxl'
    }

    const isMobileLayout = () => {
        return !isBreakpoint(utils.getRootSCSSVariable('mobile-layout-breakpoint') || 'md')
    }

    const hasFooterOffset = () => {
        return utils.isIOS() && utils.isChrome()
    }

    const hasModalOpened = () => {
        return (ongoingActivities && ongoingActivities.length) || displayingGallery || displayingYoutubeVideo || pendingConfirmation
    }

    const _createListeners = () => {
        window.addEventListener('scroll', _onScroll)
        window.addEventListener('resize', _onResize)
        _onScroll()
        _onResize()

        timeoutId = setInterval(() => {
            _onTick()
        }, TIMEOUT_STEP_IN_SECONDS * 1000)

        setDidCreateListeners(true)
    }

    const _destroyListeners = () => {
        window.removeEventListener('scroll', _onScroll)
        window.removeEventListener('resize', _onResize)
        clearTimeout(timeoutId)

        setDidCreateListeners(false)
    }

    const _onScroll = () => {
        setScrollX(window.scrollX)
        setScrollY(window.scrollY)
    }

    const _onResize = () => {
        setInnerWidth(window.innerWidth)
        setInnerHeight(window.innerHeight)
    }

    const _onTick = () => {
        setCurrentTimeSpan(prevTimer => prevTimer + TIMEOUT_STEP_IN_SECONDS)
    }

    return (
        <LayoutContext.Provider value={{
            scrollX,
            scrollY,
            innerWidth,
            innerHeight,
            currentTimeSpan,
            canHaveAnimatedCursor,
            animatedCursorEnabled,
            ongoingActivities,
            displayingNotification,
            setDisplayingNotification,
            displayingYoutubeVideo,
            setDisplayingYoutubeVideo,
            displayingGallery,
            setDisplayingGallery,
            pendingConfirmation,
            setPendingConfirmation,
            showActivitySpinner,
            hideActivitySpinner,
            toggleAnimatedCursorStatus,
            isBreakpoint,
            getBreakpoint,
            isMobileLayout,
            hasFooterOffset,
            hasModalOpened
        }}>
            {didCreateListeners && (
                <>{children}</>
            )}
        </LayoutContext.Provider>
    )
}