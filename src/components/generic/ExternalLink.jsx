import React, {useEffect, useState} from 'react'
import {useLayout} from "/src/providers/LayoutProvider.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useUtils} from "/src/helpers/utils.js"

function ExternalLink({href, className, children}) {
    const {setPendingConfirmation} = useLayout()
    const {getString} = useLanguage()
    const utils = useUtils()

    const handleClick = (e) => {
        if(href.includes('mailto') || href.includes('tel:'))
            return

        e.preventDefault()
        setPendingConfirmation({
            title: getString('open_link'),
            message: getString('leaving_site').replace('$url', utils.limitTextSize(href, 50)),
            cancelLabel: getString('cancel'),
            confirmLabel: getString('proceed'),
            confirmationCallback: () => {
                window.open(href, '_blank')
            }
        })
    };

    return (
        <a href={href} className={className} onClick={handleClick}>
            {children}
        </a>
    )
}

export default ExternalLink