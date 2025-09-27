import { GROUPS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"
import { useHttpDataLoading } from "@/shared/hooks/useDataLoading"
import { AlertService } from "@/shared/services/AlertService"
import { useState } from "react"

interface IGetGroupsResponse {
    items: {
        id: number
        title: string
        updatedAt: Date
    }[]
}

interface IGroup {
    id: number
    title: string
}

const GetAllGroupsRequest = new HttpClient().withMethodGet().withUrl(GROUPS_API)

export const useGroupDashboard = () => {
    const { state, reload } = useHttpDataLoading<IGetGroupsResponse>(GetAllGroupsRequest)
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
