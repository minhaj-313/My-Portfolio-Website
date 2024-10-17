import "./NavTabController.scss"
import React, {useEffect, useState} from 'react'
import {useLayout} from "/src/providers/LayoutProvider.jsx"
import {useData} from "/src/providers/DataProvider.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useGlobalState} from "/src/providers/GlobalStateProvider.jsx"
import FaIcon from "/src/components/generic/FaIcon.jsx"

function NavTabController() {
    const {isCategoryActive, setActiveSectionFromCategory} = useGlobalState()
    const {getCategories} = useData()
    const {hasFooterOffset, isMobileLayout, ongoingActivities} = useLayout()


    const categories = getCategories()
    const addOnClass = hasFooterOffset() ? `nav-tab-controller-with-offset` : ``

    const [clickedTabCategoryId, setClickedTabCategoryId] = useState(null)

    const _isActive = (category) => {
        if(ongoingActivities.length)
            return false

        if(clickedTabCategoryId)
            return category.id === clickedTabCategoryId
        return isCategoryActive(category.id)
    }

    const _setActive = (category) => {
        if(clickedTabCategoryId)
            return

        setClickedTabCategoryId(category.id)
        setTimeout(() => { setActiveSectionFromCategory(category.id) }, 60)
        setTimeout(() => { setClickedTabCategoryId(null) }, 100)
    }

    return (
        <>
            {isMobileLayout() && (
                <div className={`nav-tab-controller ${addOnClass}`}>
                    {categories.map((category, key) => (
                        <NavTab category={category}
                                key={key}
                                active={_isActive(category)}
                                onClick={_setActive}/>
                    ))}
                </div>
            )}
        </>
    )
}

function NavTab({category, active, onClick}) {
    const {getTranslation} = useLanguage()

    return (
        <button className={`nav-tab-btn ${active ? `nav-tab-btn-active` : ''}`}
                onClick={() => { onClick(category) }}
                disabled={active}>
            <FaIcon iconName={category.faIcon}/>
            <span className={`mb-1`}>{getTranslation(category["locales"], "title")}</span>
        </button>
    )
}

export default NavTabController