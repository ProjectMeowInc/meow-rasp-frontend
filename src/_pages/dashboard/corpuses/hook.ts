import { AlertService } from "@/shared/services/AlertService"
import { useState } from "react"
import { useGetCorpuses } from "@/features/corpus/get-corpuses"
import { CloseModalEvent } from "@/shared/types"

const useCorpusesDashboardPage = () => {
    const { useGetAllCorpusesLoading } = useGetCorpuses()
    const { state, silentReload } = useGetAllCorpusesLoading()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)

    const closeModalHandler = async (ctx: CloseModalEvent) => {
        setIsModalOpen(false)
        if (ctx.reason === "submit") {
            await silentReload()
        }
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
        closeModalHandler,
        deleteHandler,
    }
}

export default useCorpusesDashboardPage
