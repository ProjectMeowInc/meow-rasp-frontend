import { GROUPS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"
import { getErrorMessage, LoadSuccessStateType, useHttpDataLoading } from "@/shared/hooks/useDataLoading"
import { ICreatedResponse } from "@/shared/models/responses"
import { AlertService } from "@/shared/services/AlertService"
import { useState } from "react"

interface IGetGroupsResponse {
    items: {
        id: number
        title: string
    }[]
}

interface ICreateOrUpdateGroupRequest {
    title: string
}

const GetAllCorpuses = new HttpClient().withMethodGet().withUrl(GROUPS_API)

export const useGroupDashboard = () => {
    const { state, reload } = useHttpDataLoading<IGetGroupsResponse>(GetAllCorpuses)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState<ICreateOrUpdateGroupRequest>({ title: "" })
    const [editingId, setEditingId] = useState<number | null>(null)

    const submitHandler = async () => {
        if (editingId) {
            await updateGroup()
        } else {
            await createGroup()
        }
    }

    const openCreateHandler = () => {
        setFormData({ title: "" })
        setEditingId(null)
        setIsModalOpen(true)
    }

    const openUpdateHandler = async (id: number) => {
        const data = state as LoadSuccessStateType<IGetGroupsResponse>
        const group = data.content.items.find((c) => c.id == id)
        if (!group) {
            throw new Error("Группа не найдена")
        }

        setFormData({ title: group.title })
        setEditingId(id)
        setIsModalOpen(true)
    }

    const deleteHandler = async (id: number) => {
        try {
            const response = await new HttpClient()
                .withUrl(`${GROUPS_API}${id}`)
                .withMethodDelete()
                .withAuthorization()
                .send()

            if (response.hasError()) {
                const err = response.getError()
                AlertService.error(`Ошибка удаления группы: ${getErrorMessage(err)}`)
            } else {
                AlertService.success(`Группа успешно удалена`)
            }

            await reload()
        } catch {
            AlertService.error(`Ошибка удаления группы: UNKNOWN`)
        }
    }

    const updateGroup = async () => {
        const response = await new HttpClient()
            .withUrl(`${GROUPS_API}${editingId}`)
            .withMethodPut()
            .withAuthorization()
            .withJsonBody(formData)
            .send()

        closeModal()

        if (response.hasError()) {
            const err = response.getError()
            AlertService.error(`Ошибка обновления группы: ${getErrorMessage(err)}`)
        } else {
            AlertService.success(`Группа успешно обновлена`)
        }

        await reload()
    }

    const createGroup = async () => {
        try {
            const response = await new HttpClient()
                .withUrl(GROUPS_API)
                .withMethodPost()
                .withAuthorization()
                .withJsonBody(formData)
                .send<ICreatedResponse>()

            closeModal()

            if (response.hasError()) {
                const err = response.getError()
                AlertService.error(`Ошибка создания группы: ${getErrorMessage(err)}`)
            } else {
                AlertService.success(`Создана группа с Id = ${response.unwrap().createdId}`)
            }

            await reload()
        } catch {
            AlertService.error(`Ошибка создания группы: UNKNOWN`)
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setFormData({ title: "" })
        setEditingId(null)
    }

    const cancelHandler = () => {
        closeModal()
    }

    return {
        state,
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
