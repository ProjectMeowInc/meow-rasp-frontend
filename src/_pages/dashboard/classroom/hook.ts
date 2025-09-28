import { GetAllCorpusesResponse } from "@/entities/corpus"
import { useGetClassrooms } from "@/features/classroom/get-classrooms"
import { useGetCorpuses } from "@/features/corpus/get-corpuses"
import { LoadSuccessStateType } from "@/shared/hooks/useDataLoading"
import { CloseModalEvent } from "@/shared/types"
import { useState } from "react"

const useClassroomDashboard = () => {
    const { useGetAllClassroomsLoading } = useGetClassrooms()
    const { state, silentReload } = useGetAllClassroomsLoading()

    const { useGetAllCorpusesLoading } = useGetCorpuses()
    const { state: corpusesState } = useGetAllCorpusesLoading()

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
        const data = state as LoadSuccessStateType<GetAllCorpusesResponse>
        const classroom = data.content.items.find((c) => c.id == id)
        if (!classroom) {
            throw new Error("Кабинет не найден")
        }

        setEditingId(id)
        setIsModalOpen(true)
    }

    const deleteHandler = async () => {
        throw new Error("WIP")
    }

    return {
        state,
        editingId,
        corpusesState,
        isModalOpen,
        closeModalHandler,
        setIsModalOpen,
        openUpdateHandler,
        openCreateHandler,
        deleteHandler,
    }
}

export default useClassroomDashboard
