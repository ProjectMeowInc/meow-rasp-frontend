import React, { JSX } from "react"
import styles from "./styles.module.css"

type AlertVariant = "error" | "warning" | "info" | "success"

const Alert: React.FC<{
    variant: AlertVariant
    children: React.ReactNode
}> = ({ variant, children }) => {
    return (
        <div className={`${styles.alert} ${styles[variant]}`}>
            <div className={styles.icon}>{icons[variant]}</div>
            <div className={styles.message}>{children}</div>
        </div>
    )
}

const icons: Record<AlertVariant, JSX.Element> = {
    error: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm0 14a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm1-3.5a1 1 0 0 1-2 0V7a1 1 0 0 1 2 0v5.5z" />
        </svg>
    ),
    warning: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
        </svg>
    ),
    info: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm.75 15h-1.5v-6h1.5v6zm0-8h-1.5V7h1.5v2z" />
        </svg>
    ),
    success: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm-1.25 14.292-4.25-4.25 1.5-1.5 2.75 2.75 5.75-5.75 1.5 1.5-7.25 7.25z" />
        </svg>
    ),
}

export default Alert
