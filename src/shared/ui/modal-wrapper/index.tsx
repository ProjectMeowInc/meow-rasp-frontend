"use client"

import styles from "./styles.module.css"

interface ModalWrapperProps {
    children: React.ReactNode
    onClose: () => void
}

const ModalWrapper = ({ children, onClose }: ModalWrapperProps) => {
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>
                {children}
            </div>
        </div>
    )
}

export default ModalWrapper
