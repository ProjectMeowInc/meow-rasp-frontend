"use client"

import React from "react"
import styles from "./styles.module.css"

const DashboardHeader: React.FC<{
    caption: string
    buttonCaption: string
    onButtonClick?: () => Promise<void> | void
}> = ({ caption, buttonCaption, onButtonClick }) => {
    return (
        <div className={styles.header}>
            <h2>{caption}</h2>
            <button className={styles.addButton} onClick={() => onButtonClick?.call(null)}>
                + {buttonCaption}
            </button>
        </div>
    )
}

export default DashboardHeader
