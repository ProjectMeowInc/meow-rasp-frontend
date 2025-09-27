import React from "react"
import { OnCloseFn } from "@/shared/types"
import EditTeacherModal from "@/features/teacher/edit-teacher/ui/edit-teacher-module"
import CreateTeacherModal from "@/features/teacher/create-teacher/ui/create-teacher-modal"

export const CreateOrEditTeacherModal: React.FC<{
    teacherId: number | null
    isOpen: boolean
    onClose: OnCloseFn
}> = ({ isOpen, teacherId, onClose }) => {
    if (teacherId) {
        return <EditTeacherModal teacherId={teacherId} isOpen={isOpen} onClose={onClose} />
    } else {
        return <CreateTeacherModal isOpen={isOpen} onClose={onClose} />
    }
}
