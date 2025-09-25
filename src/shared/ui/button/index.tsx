"use client"

import React from "react"
import styles from "./styles.module.css"

interface IButtonProps {
    children?: React.ReactNode
    onClick?: () => void
    style?: React.CSSProperties
}

const Button: React.FC<IButtonProps> = ({ children, onClick, style }) => {
    return (
        <button style={style} onClick={onClick} className={styles.button}>
            {children}
        </button>
    )
}

export default Button
