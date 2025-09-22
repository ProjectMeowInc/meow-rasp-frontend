"use client"

import React from "react"
import styles from "./header.module.css"

interface IHeaderProps {
    caption: string
    buttonCaption: string
    onButtonClick?: () => Promise<void> | void
}

const Header: React.FC<IHeaderProps> = ({ caption, buttonCaption, onButtonClick }) => {
    return (
        <div className={styles.header}>
            <h2>{caption}</h2>
            <button className={styles.addButton} onClick={() => onButtonClick?.call(null)}>
                + {buttonCaption}
            </button>
        </div>
    )
}

export default Header
