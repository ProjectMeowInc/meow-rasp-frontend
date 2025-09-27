import React from "react"
import ModalButtons from "./ui/modal-buttons"
import ModalWrapper from "../modal-wrapper"

export { default as ModalLabel } from "./ui/modal-label"
export { default as ModalButtons } from "./ui/modal-buttons"

interface IModalProps {
    title: string
    isOpen?: boolean
    onSubmit: () => void
    onClose: () => void
    children: React.ReactNode
}

const Modal: React.FC<IModalProps> = ({ title, isOpen, onSubmit, onClose, children }) => {
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
