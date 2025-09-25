import { CLASSROOMS_API, CORPUSES_API, NOT_SELECTED_ID } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"
import { getErrorMessage, LoadSuccessStateType, useHttpDataLoading } from "@/shared/hooks/useDataLoading"
import { CreatedResponse } from "@/shared/models/responses"
import { AlertService } from "@/shared/services/AlertService"
import { useState } from "react"

interface IGetClassroomsResponse {
    items: {
        id: number
        title: string
        corpusId: number
    }[]
}

interface ICreateOrUpdateClassroomRequest {
    title: string
    corpusId: number
}

const GetAllClassrooms = new HttpClient().withMethodGet().withUrl(CLASSROOMS_API)
const GetAllCorpuses = new HttpClient().withMethodGet().withUrl(CORPUSES_API)

const useClassroomDashboard = () => {
    const { state, reload } = useHttpDataLoading<IGetClassroomsResponse>(GetAllClassrooms)
    const { state: corpusesState } = useHttpDataLoading<{ items: { id: number; title: string }[] }>(GetAllCorpuses)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState<ICreateOrUpdateClassroomRequest>({
        title: "",
        corpusId: NOT_SELECTED_ID,
    })
    const [editingId, setEditingId] = useState<number | null>(null)

    const submitHandler = async () => {
        if (editingId) {
            await updateClassroom()
        } else {
            await createClassroom()
        }
    }

    const openCreateHandler = () => {
        setFormData({ title: "", corpusId: NOT_SELECTED_ID })
        setEditingId(null)
        setIsModalOpen(true)
    }

    const openUpdateHandler = async (id: number) => {
        const data = state as LoadSuccessStateType<IGetClassroomsResponse>
        const classroom = data.content.items.find((c) => c.id == id)
        if (!classroom) {
            throw new Error("Кабинет не найден")
        }

        setFormData({
            title: classroom.title,
            corpusId: classroom.corpusId,
        })
        setEditingId(id)
        setIsModalOpen(true)
    }

    const deleteHandler = async (id: number) => {
        try {
            const response = await new HttpClient()
                .withUrl(`${CLASSROOMS_API}${id}`)
                .withMethodDelete()
                .withAuthorization()
                .send()

            if (response.hasError()) {
                const err = response.getError()
                AlertService.error(`Ошибка удаления кабинета: ${getErrorMessage(err)}`)
            } else {
                AlertService.success(`Кабинет успешно удалён`)
            }

            await reload()
        } catch {
            AlertService.error(`Ошибка удаления кабинета: UNKNOWN`)
        }
    }

    const updateClassroom = async () => {
        if (formData.corpusId === NOT_SELECTED_ID) {
            return AlertService.error("Выберите корпус")
        }

        const response = await new HttpClient()
            .withUrl(`${CLASSROOMS_API}${editingId}`)
            .withMethodPut()
            .withAuthorization()
            .withJsonBody(formData)
            .send()

        closeModal()

        if (response.hasError()) {
            const err = response.getError()
            AlertService.error(`Ошибка обновления кабинета: ${getErrorMessage(err)}`)
        } else {
            AlertService.success(`Кабинет успешно обновлён`)
        }

        await reload()
    }

    const createClassroom = async () => {
        if (formData.corpusId === NOT_SELECTED_ID) {
            return AlertService.error("Выберите корпус")
        }

        try {
            const response = await new HttpClient()
                .withUrl(CLASSROOMS_API)
                .withMethodPost()
                .withAuthorization()
                .withJsonBody(formData)
                .send<CreatedResponse>()

            closeModal()

            if (response.hasError()) {
                const err = response.getError()
                AlertService.error(`Ошибка создания кабинета: ${getErrorMessage(err)}`)
            } else {
                AlertService.success(`Создан кабинет с Id = ${response.unwrap().createdId}`)
            }

            await reload()
        } catch {
            AlertService.error(`Ошибка создания кабинета: UNKNOWN`)
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setFormData({ title: "", corpusId: NOT_SELECTED_ID })
        setEditingId(null)
    }

    const cancelHandler = () => {
        closeModal()
    }

    return {
        state,
        corpusesState,
        isModalOpen,
        formData,
        setFormData,
        cancelHandler,
        openUpdateHandler,
        openCreateHandler,
        deleteHandler,
        submitHandler,
    }
}

export default useClassroomDashboard
