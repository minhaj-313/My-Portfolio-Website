import React, { createContext, useContext, useState, useEffect } from 'react'
import {useData} from "/src/providers/DataProvider.jsx"
import {useFeedbacks} from "/src/providers/FeedbacksProvider.jsx"

const GlobalStateContext = createContext(null)
export const useGlobalState = () => useContext(GlobalStateContext)

export const GlobalStateProvider = ({children}) => {
    const {getSections, getCategories, getCategorySections} = useData()
    const {showActivitySpinner, hideActivitySpinner} = useFeedbacks()

    const [activeSectionId, setActiveSectionId] = useState(null)
    const [lastSectionChangeTimespan, setLastSectionChangeTimespan] = useState(null)
    const [sectionChangingTimeoutId, setSectionChangingTimeoutId] = useState(-1)
    const [fixedNavigationEnabled, setFixedNavigationEnabled] = useState(true)
    const [didRenderFirstSection, setDidRenderFirstSection] = useState(false)

    const sections = getSections()
    const categories = getCategories()

    /** Loaded everything **/
    useEffect(() => {
        const hash = window.location.hash
        const hashValue = hash.substring(1)
        const initialSection = sections.find(section => section.id === hashValue)
        if(initialSection) {
            _makeSectionActive(initialSection.id)
        }
        else {
            _makeSectionActive(sections[0].id)
        }
    }, [])

    const _makeSectionActive = (sectionId) => {
        const timespan = new Date().getTime()
        setLastSectionChangeTimespan(timespan)

        clearTimeout(sectionChangingTimeoutId)

        setActiveSectionId(sectionId)
        window.location.hash = sectionId

        hideActivitySpinner('section-changing')

        const section = sections.find(section => section.id === sectionId)
        if(section && section.category) {
            window.visitHistory = window.visitHistory || []
            window.visitHistory[section.category.id] = sectionId
        }
    }

    const setActiveSection = (sectionId) => {
        const section = sections.find(section => section.id === sectionId)
        if(!section)
            return

        const timespan = new Date().getTime()
        const diff = timespan - (lastSectionChangeTimespan || 0)
        const minWaitingTime = 800

        if(diff > minWaitingTime) {
            _makeSectionActive(sectionId)
            return
        }

        const waitingTime = Math.max(minWaitingTime - diff, 300)
        showActivitySpinner('section-changing')
        clearTimeout(sectionChangingTimeoutId)

        setSectionChangingTimeoutId(
            setTimeout(() => {
                _makeSectionActive(sectionId)
            }, waitingTime)
        )
    }

    const getActiveSection = () => {
        return sections.find(section => section.id === activeSectionId)
    }

    const isSectionActive = (sectionId) => {
        if(!activeSectionId)
            return false

        return activeSectionId === sectionId
    }

    const setActiveSectionFromCategory = (categoryId) => {
        if(isCategoryActive(categoryId))
            return

        const category = categories.find(category => category.id === categoryId)
        const sections = getCategorySections(category)

        if(!category || !sections || sections.length === 0)
            return

        const targetSectionId = window.visitHistory && window.visitHistory[categoryId] ?
            window.visitHistory[categoryId] :
            sections[0].id

        setActiveSection(targetSectionId)
    }

    const isCategoryActive = (categoryId) => {
        const displayingSection = getActiveSection()
        if(!displayingSection || !displayingSection.category)
            return false
        return displayingSection.category.id === categoryId
    }

    const getActiveCategory = () => {
        const section = getActiveSection()
        if(!section)
            return null
        return section.category
    }

    return (
        <GlobalStateContext.Provider value={{
            activeSectionId,
            setActiveSection,
            getActiveSection,
            isSectionActive,
            setActiveSectionFromCategory,
            isCategoryActive,
            getActiveCategory,
            fixedNavigationEnabled,
            setFixedNavigationEnabled,
            didRenderFirstSection,
            setDidRenderFirstSection
        }}>
            {activeSectionId && (
                <>{children}</>
            )}
        </GlobalStateContext.Provider>
    )
}