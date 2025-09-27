"use client"

import React from "react"
import Modal, { ModalLabel } from "@/shared/ui/modal"
import { useCreateCorpusModal } from "@/features/dashboard/corpus/create-corpus/ui/create-corpus-modal/hook"

export const CreateCorpusModal: React.FC<{
    onClose: () => void
    isOpen: boolean
}> = ({ onClose, isOpen }) => {
    const { formData, setFormData, submitHandler, error } = useCreateCorpusModal(onClose)

    return (
        <Modal onSubmit={submitHandler} title="Добавить корпус" isOpen={isOpen} onClose={onClose}>
            <ModalLabel
                label="Название корпуса"
                type="text"
                value={formData.title}
                required
                onChange={(val) =>
                    setFormData((prev) => ({
                        ...prev,
                        title: val,
                    }))
                }
            />
            <div>{error}</div>
        </Modal>
    )
}
