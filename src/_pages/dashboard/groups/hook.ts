import { useGetGroups } from "@/features/group/get-groups"
import { AlertService } from "@/shared/services/AlertService"
import { useState } from "react"

interface IGroup {
    id: number
    title: string
}

export const useGroupDashboard = () => {
    const { useGetAllGroupsLoading } = useGetGroups()
    const { state, reload } = useGetAllGroupsLoading()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null)

    const submitHandler = async () => {
        setEditingId(null)
        setIsModalOpen(false)
        await reload()
    }

    const openCreateHandler = () => {
        setEditingId(null)
        setIsModalOpen(true)
    }

    const openUpdateHandler = async (id: number) => {
        setEditingId(id)
        setIsModalOpen(true)
    }

    const deleteHandler = async () => {
        AlertService.error(`Work in progress...`)
    }

    return {
        state,
        isModalOpen,
        editingId,
        selectedGroup,
        openUpdateHandler,
        openCreateHandler,
        deleteHandler,
        submitHandler,
        setSelectedGroup,
    }
}
