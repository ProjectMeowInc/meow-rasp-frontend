import { CorpusSelect } from "@/entities/corpus"
import { OnCloseFn } from "@/shared/types"
import Modal, { ModalLabel } from "@/shared/ui/modal"
import React from "react"
import { useEditClassroomModal } from "./hook"

export const EditClassroomModal: React.FC<{
    classroomId: number
    isOpen?: boolean
    onClose: OnCloseFn
}> = ({ classroomId, isOpen, onClose }) => {
    const { error, formData, corpusesState, submitHandler, setFormData } = useEditClassroomModal(classroomId, onClose)

    return (
        <Modal title="Редактировать кабинет" onSubmit={submitHandler} isOpen={isOpen} onClose={onClose}>
            <ModalLabel
                label="Название кабинета"
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

            <CorpusSelect corpusesState={corpusesState} />
            {error && <div>Ошибка: {error}</div>}
        </Modal>
    )
}
