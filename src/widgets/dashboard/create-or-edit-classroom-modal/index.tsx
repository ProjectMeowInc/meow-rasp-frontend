import { CreateClassroomModal } from "@/features/dashboard/classroom/create-classroom"
import { EditClassroomModal } from "@/features/dashboard/classroom/edit-classroom"
import { OnCloseFn } from "@/shared/types"
import React from "react"

export const CreateOrEditClassroomModal: React.FC<{
    editingId: number | null
    isOpen: boolean
    onClose: OnCloseFn
}> = ({ isOpen, editingId, onClose }) => {
    if (editingId) {
        return <EditClassroomModal classroomId={editingId} isOpen={isOpen} onClose={onClose} />
    } else {
        return <CreateClassroomModal isOpen={isOpen} onClose={onClose} />
    }
}
