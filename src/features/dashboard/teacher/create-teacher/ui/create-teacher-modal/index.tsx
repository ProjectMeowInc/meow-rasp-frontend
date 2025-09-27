"use client"

import React from "react"
import Modal, { ModalLabel } from "@/shared/ui/modal"
import { OnCloseFn } from "@/shared/types"
import { useCreateTeacherModal } from "@/features/dashboard/teacher/create-teacher/ui/create-teacher-modal/hook"

const CreateTeacherModal: React.FC<{
    isOpen: boolean
    onClose: OnCloseFn
}> = ({ isOpen, onClose }) => {
    const { name, error, submitHandler, setName } = useCreateTeacherModal(onClose)

    return (
        <Modal title="Добавить преподавателя" isOpen={isOpen} onSubmit={submitHandler} onClose={onClose}>
            <ModalLabel
                label={"ФИО преподавателя"}
                type={"text"}
                value={name}
                required
                onChange={(val) => setName(val)}
            />
            {error}
        </Modal>
    )
}

export default CreateTeacherModal
