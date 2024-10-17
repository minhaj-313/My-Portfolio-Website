import React from 'react'
import {useLayout} from "/src/providers/LayoutProvider.jsx"
import NavLink from "/src/components/nav/desktop/NavLink.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"

function CursorToggleButton() {
    const {canHaveAnimatedCursor, animatedCursorEnabled, toggleAnimatedCursorStatus} = useLayout()
    const {getString} = useLanguage()

    const _toggle = () => {
        toggleAnimatedCursorStatus()
    }

    return (
        <div className={`toggle-button-wrapper`}>
            {canHaveAnimatedCursor && (
                <NavLink shrink={true}
                         label={``}
                         tooltip={getString('magic_cursor_on')}
                         icon={!animatedCursorEnabled ? 'fa-solid fa-wand-magic' : 'fa-solid fa-wand-magic-sparkles'}
                         size={2}
                         onClick={_toggle}/>
            )}
        </div>
    )
}

export default CursorToggleButton