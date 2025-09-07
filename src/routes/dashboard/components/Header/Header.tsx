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
            <h1>{caption}</h1>
            <button className={styles.addButton} onClick={() => onButtonClick?.call(null)}>
                + {buttonCaption}
            </button>
        </div>
    )
}

export default Header
