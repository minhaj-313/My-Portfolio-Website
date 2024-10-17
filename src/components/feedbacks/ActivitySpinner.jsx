import "./ActivitySpinner.scss"
import React from 'react'
import {useUtils} from "/src/helpers/utils.js"
import {useLayout} from "/src/providers/LayoutProvider.jsx"

function ActivitySpinner() {
    const utils = useUtils()
    const {ongoingActivities} = useLayout()

    const visible = ongoingActivities.length > 0
    const message = ongoingActivities.length > 0 ? ongoingActivities[0].message : null

    return (
        <>
            {visible && (
                <div className={`activity-spinner ${!visible ? "activity-spinner-hidden" : ""}`}>
                    <div className={`activity-spinner-content`}>
                        <img src={utils.resolvePath(`/images/svg/spinner.svg`)}
                             className={`spinner`}
                             alt={`loader`}/>

                        <h6 className={`text-white opacity-75`}>{message}</h6>
                    </div>
                </div>
            )}
        </>
    )
}

export default ActivitySpinner
