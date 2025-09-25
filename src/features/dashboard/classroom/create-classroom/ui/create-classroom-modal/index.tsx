"use client"

import Modal, { ModalButtons, ModalLabel } from "@/shared/ui/modal"
import Select, { SelectItem } from "@/shared/ui/select"
import { useCreateClassroomModal } from "./hook"
import { CorpusSelect } from "@/entities/corpus/ui/corpus-select"

export const CreateClassroomModal: React.FC<{
    isOpen?: boolean
    onClose: () => void
}> = ({ isOpen, onClose }) => {
    const { formData, corpusesState, setFormData, submitHandler } = useCreateClassroomModal(onClose)

    return (
        <Modal title="Добавить кабинет" isOpen={isOpen} onClose={onClose}>
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

            <ModalButtons submitVariant="success" cancelVariant="danger" onSubmit={submitHandler} onCancel={onClose} />
        </Modal>
    )
}
