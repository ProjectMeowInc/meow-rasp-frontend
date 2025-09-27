"use client"

import Modal, { ModalLabel } from "@/shared/ui/modal"
import { useCreateClassroomModal } from "./hook"
import { CorpusSelect } from "@/entities/corpus/ui/corpus-select"

export const CreateClassroomModal: React.FC<{
    isOpen?: boolean
    onClose: () => void
}> = ({ isOpen, onClose }) => {
    const { formData, error, corpusesState, setFormData, submitHandler } = useCreateClassroomModal(onClose)

    return (
        <Modal title="Добавить кабинет" isOpen={isOpen} onSubmit={submitHandler} onClose={onClose}>
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

            <CorpusSelect
                onChange={(id) =>
                    setFormData((prev) => ({
                        ...prev,
                        corpusId: id,
                    }))
                }
                corpusesState={corpusesState}
            />
            {error && <div>Ошибка: {error}</div>}
        </Modal>
    )
}
