"use client"

import React from "react"
import Modal, { ModalLabel } from "@/shared/ui/modal"
import { OnCloseFn } from "@/shared/types"
import { useEditTeacherModal } from "@/features/dashboard/teacher/edit-teacher/ui/edit-teacher-module/hook"

const EditTeacherModal: React.FC<{
    teacherId: number
    isOpen: boolean
    onClose: OnCloseFn
}> = ({ teacherId, isOpen, onClose }) => {
    const { name, error, submitHandler, setName } = useEditTeacherModal(teacherId, onClose)

    return (
        <Modal title="Редактировать преподавателя" isOpen={isOpen} onSubmit={submitHandler} onClose={onClose}>
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

export default EditTeacherModal
