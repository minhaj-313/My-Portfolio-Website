import "./FilterTabs.scss"
import React from 'react'
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useUtils} from "/src/helpers/utils.js"

const utils = useUtils()

function FilterTabs({items, selectedItemId, onSelect}) {
    const _onTabClicked = (item) => {
        if(onSelect) {
            onSelect(item.id)
        }
    }

    return (
        <div className="filter-tabs">
            <div className={`btn-group`} role={`group`}>
                {items.map((item, key) => (
                    <FilterTabButton key={key}
                                     item={item}
                                     isSelected={item.id === selectedItemId}
                                     onClick={_onTabClicked}/>
                ))}
            </div>
        </div>
    )
}

function FilterTabButton({item, isSelected, onClick}) {
    const {getString} = useLanguage()

    const customBtnClass = isSelected ? `btn-selected` : null
    const tooltipText = getString('filter_by').replace('{x}', item.label)
    const label = item.label + (item.count ? ` (${item.count})` : '')

    const _onClick = (e) => {
        onClick(item)
    }

    return (
        <button data-tooltip={tooltipText}
                type={`button`}
                className={`btn btn-primary ${customBtnClass} text-1`}
                onClick={_onClick}>
            <span>{label}</span>
        </button>
    )
}

export default FilterTabs