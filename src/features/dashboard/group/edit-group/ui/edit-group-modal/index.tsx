import { OnCloseFn } from "@/shared/types"
import { useEditGroupModal } from "./hook"
import Modal, { ModalLabel } from "@/shared/ui/modal"

export const EditGroupModal: React.FC<{
    isOpen: boolean
    groupId: number
    onClose: OnCloseFn
}> = ({ isOpen, groupId, onClose }) => {
    const { formData, error, setFormData, submitHandler } = useEditGroupModal(groupId, onClose)

    return (
        <Modal onSubmit={submitHandler} title={"Редактировать группу"} isOpen={isOpen} onClose={onClose}>
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
