"use client"

import React from "react"
import Modal, { ModalLabel } from "@/shared/ui/modal"
import { useEditCorpusModal } from "./hook"
import { OnCloseFn } from "@/shared/types"

export const EditCorpusModal: React.FC<{
    corpusId: number
    isOpen: boolean
    onClose: OnCloseFn
}> = ({ corpusId, onClose, isOpen }) => {
    const { formData, setFormData, submitHandler, error } = useEditCorpusModal(corpusId, onClose)

    return (
        <Modal onSubmit={submitHandler} title="Редактирование корпуса" isOpen={isOpen} onClose={onClose}>
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
