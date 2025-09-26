"use client"

import React from "react"
import styles from "./styles.module.css"

const SelectError: React.FC<{
    message?: string
    onRetry?: () => void
}> = ({ message = "Не удалось загрузить данные", onRetry }) => {
    return (
        <div className={styles.errorItem}>
            <span>{message}</span>
            {onRetry && (
                <button className={styles.retryButton} onClick={onRetry}>
                    Повторить
                </button>
            )}
        </div>
    )
}

export default SelectError
