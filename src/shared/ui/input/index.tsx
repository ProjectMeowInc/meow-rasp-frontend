"use client"

import React from "react"
import styles from "./styles.module.css"

interface IInputProps {
    placeholder?: string
    type?: "text" | "password"
    onChange?: (value: string) => void
    style?: React.CSSProperties
    defaultValue?: string
}

const Input: React.FC<IInputProps> = ({ placeholder, type, onChange, style, defaultValue }) => {
    const changeHandler = (value: string) => {
        onChange?.call(null, value)
    }

    return (
        <input
            onChange={(e) => changeHandler(e.target.value)}
            className={styles.input}
            placeholder={placeholder}
            type={type}
            style={style}
            defaultValue={defaultValue}
        />
    )
}

export default Input
