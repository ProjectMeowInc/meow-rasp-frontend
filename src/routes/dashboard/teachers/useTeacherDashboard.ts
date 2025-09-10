import { TEACHERS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"
import { getErrorMessage, LoadSuccessStateType, useHttpDataLoading } from "@/shared/hooks/useDataLoading"
import { ICreatedResponse } from "@/shared/models/responses"
import { GetAllTeachersRequest, IGetTeachersResponse } from "@/shared/requests"
import { AlertService } from "@/shared/services/AlertService"
import { useState } from "react"

interface ICreateTeacherRequest {
    name: string
}

const useTeacherDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState<ICreateTeacherRequest>({ name: "" })
    const [editingId, setEditingId] = useState<number | null>(null)
    const { state, reload } = useHttpDataLoading<IGetTeachersResponse>(GetAllTeachersRequest)

    const submitHandler = async () => {
        if (editingId) {
            await updateTeacher()
        } else {
            await createTeacher()
        }
    }

    const openCreateTeacherHandler = () => {
        setFormData({ name: "" })
        setEditingId(null)
        setIsModalOpen(true)
    }

    const openUpdateTeacherHandler = (id: number) => {
        const data = state as LoadSuccessStateType<IGetTeachersResponse>
        const teacher = data.content.items.find((t) => t.id == id)
        // unreachable error, but for safety :))
        if (!teacher) {
            throw new Error("Учитель не найден")
        }
        setFormData({ name: teacher.name })
        setEditingId(id)
        setIsModalOpen(true)
    }

    const deleteTeacherHandler = async () => {
        AlertService.error("Work in progress...")
    }

    const updateTeacher = async () => {
        const response = await new HttpClient()
            .withUrl(`${TEACHERS_API}${editingId}`)
            .withMethodPut()
            .withAuthorization()
            .withJsonBody(formData)
            .send()

        closeModal()

        if (response.hasError()) {
            const err = response.getError()
            AlertService.error(`Ошибка обновления преподавателя: ${getErrorMessage(err)}`)
        } else {
            AlertService.success(`Преподаватель успешно обновлён`)
        }

        await reload()
    }

    const createTeacher = async () => {
        try {
            const response = await new HttpClient()
                .withUrl(TEACHERS_API)
                .withMethodPost()
                .withAuthorization()
                .withJsonBody(formData)
                .send<ICreatedResponse>()

            closeModal()

            if (response.hasError()) {
                const err = response.getError()
                AlertService.error(`Ошибка создания преподавателя: ${getErrorMessage(err)}`)
            } else {
                AlertService.success(`Создан преподаватель с Id = ${response.unwrap().createdId}`)
            }

            await reload()
        } catch {
            AlertService.error(`Ошибка создание преподавателя: UNKNOWN`)
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setFormData({ name: "" })
        setEditingId(null)
    }

    const cancelHandler = async () => {
        closeModal()
    }

    return {
        isModalOpen,
        formData,
        openCreateTeacherHandler,
        openUpdateTeacherHandler,
        setFormData,
        state,
        submitHandler,
        cancelHandler,
        deleteTeacherHandler,
    }
}

export default useTeacherDashboard
