import "./MainSlider.scss"
import React from 'react'
import {useData} from "/src/providers/DataProvider.jsx"
import {useLayout} from "/src/providers/LayoutProvider.jsx"
import Section from "/src/components/layout/Section.jsx"

function MainSlider() {
    const {getSections} = useData()
    const {hasFooterOffset} = useLayout()

    const sections = getSections()
    const addOnClassList = hasFooterOffset() ? `sections-slider-offset-bottom ` : ``

    return (
        <div className={`sections-slider highlight-scrollbar ${addOnClassList}`}>
            {sections.map((section, key) => {
                return (
                    <Section key={key} section={section}/>
                )
            })}
        </div>
    )
}

export default MainSlider