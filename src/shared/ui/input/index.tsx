"use client"

import React from "react"
import styles from "./styles.module.css"

interface IInputProps {
    placeholder?: string
    type?: "text" | "password"
    ref?: React.RefObject<HTMLInputElement | null>
    onChange?: (value: string) => void
    style?: React.CSSProperties
    defaultValue?: string
}

const Input: React.FC<IInputProps> = ({ placeholder, type, ref, onChange, style, defaultValue }) => {
    const changeHandler = (value: string) => {
        onChange?.call(null, value)
    }

    return (
        <input
            ref={ref}
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
