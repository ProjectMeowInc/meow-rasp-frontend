import { AlertService } from "@/shared/services/AlertService"
import { useState } from "react"
import { useGetCorpuses } from "@/features/dashboard/corpus/get-corpuses"

const useCorpusesDashboardPage = () => {
    const { useGetAllCorpusesLoading } = useGetCorpuses()
    const { state, reload } = useGetAllCorpusesLoading()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)

    const submitHandler = async () => {
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
        editingId,
        isModalOpen,
        openCreateHandler,
        openUpdateHandler,
        submitHandler,
        deleteHandler,
    }
}

export default useCorpusesDashboardPage
