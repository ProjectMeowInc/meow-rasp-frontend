"use client"

import React from "react"
import styles from "./styles.module.css"

const ModalWrapper: React.FC<{
    title: string
    children: React.ReactNode
    onClose: () => void
}> = ({ title, children, onClose }) => {
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2>{title}</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        ×
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default ModalWrapper
