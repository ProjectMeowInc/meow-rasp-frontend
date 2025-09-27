import React from "react"
import ModalButtons from "./ui/modal-buttons"
import ModalWrapper from "../modal-wrapper"

export { default as ModalLabel } from "./ui/modal-label"
export { default as ModalButtons } from "./ui/modal-buttons"

const Modal: React.FC<{
    title: string
    isOpen?: boolean
    onSubmit: () => void
    onClose: () => void
    children: React.ReactNode
}> = ({ title, isOpen, onSubmit, onClose, children }) => {
    if (!isOpen) {
        return null
    }

    return (
        <ModalWrapper title={title} onClose={onClose}>
            <>{children}</>
            <>
                <ModalButtons submitVariant="success" cancelVariant="danger" onSubmit={onSubmit} onCancel={onClose} />
            </>
        </ModalWrapper>
    )
}

export default Modal
