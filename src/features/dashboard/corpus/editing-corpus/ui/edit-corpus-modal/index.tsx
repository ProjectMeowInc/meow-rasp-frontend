import React from "react"
import Modal, { ModalLabel } from "@/shared/ui/modal"
import { useEditCorpusModal } from "./hook"

export const EditCorpusModal: React.FC<{
    corpusId: number
    onClose: () => void
    isOpen: boolean
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
