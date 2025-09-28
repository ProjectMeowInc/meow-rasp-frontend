"use client"

import React from "react"
import styles from "./styles.module.css"
import { OnCloseFn } from "@/shared/types"

const ModalWrapper: React.FC<{
    title: string
    children: React.ReactNode
    onClose: OnCloseFn
}> = ({ title, children, onClose }) => {
    return (
        <div className={styles.modalOverlay} onClick={() => onClose({ reason: "cancel" })}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2>{title}</h2>
                    <button className={styles.closeButton} onClick={() => onClose({ reason: "cancel" })}>
                        ×
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default ModalWrapper
