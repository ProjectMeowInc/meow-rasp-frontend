"use client"

import React from "react"
import styles from "./styles.module.css"

const Button: React.FC<{
    children?: React.ReactNode
    onClick?: () => void
    style?: React.CSSProperties
}> = ({ children, onClick, style }) => {
    return (
        <button style={style} onClick={onClick} className={styles.button}>
            {children}
        </button>
    )
}

export default Button
