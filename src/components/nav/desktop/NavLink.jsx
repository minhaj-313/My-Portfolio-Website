import "./NavLink.scss"
import React from 'react'
import MenuItem from "/src/components/generic/MenuItem.jsx"
import {useUtils} from "/src/helpers/utils.js"

function NavLink({ shrink, label, icon, size, className, rounded, selected, disabled, onClick, tooltip }) {
    const utils = useUtils()

    return (
        <button className={`nav-link ${utils.strIf(rounded, `nav-link-rounded`)}`}
                disabled={disabled}
                onClick={onClick}>
            <MenuItem shrink={shrink}
                      label={label}
                      icon={icon}
                      hoverAnimation={true}
                      size={size}
                      tooltip={tooltip}
                      selected={selected}
                      className={className}/>
        </button>
    )
}

export default NavLink