import React from "react"
import styles from "./modal.module.css"

interface IModalProps {
    title: string
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

const Modal: React.FC<IModalProps> = ({ title, isOpen, onClose, children }) => {
    if (!isOpen) {
        return null
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2>{title}</h2>
                    <button className={styles.close} onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    )
}

export default Modal
