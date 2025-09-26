import { CLASSROOMS_API, CORPUSES_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"
import { LoadSuccessStateType, useHttpDataLoading } from "@/shared/hooks/useDataLoading"
import { useState } from "react"

interface IGetClassroomsResponse {
    items: {
        id: number
        title: string
        corpusId: number
    }[]
}

const GetAllClassrooms = new HttpClient().withMethodGet().withUrl(CLASSROOMS_API)
const GetAllCorpuses = new HttpClient().withMethodGet().withUrl(CORPUSES_API)

const useClassroomDashboard = () => {
    const { state } = useHttpDataLoading<IGetClassroomsResponse>(GetAllClassrooms)
    const { state: corpusesState } = useHttpDataLoading<{ items: { id: number; title: string }[] }>(GetAllCorpuses)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)

    const openCreateHandler = () => {
        setEditingId(null)
        setIsModalOpen(true)
    }

    const openUpdateHandler = async (id: number) => {
        const data = state as LoadSuccessStateType<IGetClassroomsResponse>
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
        setIsModalOpen,
        openUpdateHandler,
        openCreateHandler,
        deleteHandler,
    }
}

export default useClassroomDashboard
