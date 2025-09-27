import { CreateGroupModal } from "@/features/dashboard/group/create-group"
import { EditGroupModal } from "@/features/dashboard/group/edit-group"
import { OnCloseFn } from "@/shared/types"
import React from "react"

export const CreateOrEditGroupModal: React.FC<{
    isOpen: boolean
    groupId: number | null
    onClose: OnCloseFn
}> = ({ isOpen, groupId, onClose }) => {
    if (groupId) {
        return <EditGroupModal isOpen={isOpen} groupId={groupId} onClose={onClose} />
    } else {
        return <CreateGroupModal isOpen={isOpen} onClose={onClose} />
    }
}
