"use client"

import { OnCloseFn } from "@/shared/types"
import Modal, { ModalLabel } from "@/shared/ui/modal"
import { useCreateGroupModal } from "./hook"

export const CreateGroupModal: React.FC<{
    isOpen: boolean
    onClose: OnCloseFn
}> = ({ isOpen, onClose }) => {
    const { formData, error, setFormData, submitHandler } = useCreateGroupModal(onClose)

    return (
        <Modal onSubmit={submitHandler} title={"Добавить группу"} isOpen={isOpen} onClose={onClose}>
            <ModalLabel
                label="Название группы"
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
            {error}
        </Modal>
    )
}
