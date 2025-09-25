import { CORPUSES_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"
import { getErrorMessage, LoadSuccessStateType, useHttpDataLoading } from "@/shared/hooks/useDataLoading"
import { CreatedResponse } from "@/shared/models/responses"
import { AlertService } from "@/shared/services/AlertService"
import { useState } from "react"

interface IGetCorpusesResponse {
    items: {
        id: number
        title: string
    }[]
}

interface ICreateOrUpdateCorpusRequest {
    title: string
}

const GetAllCorpuses = new HttpClient().withMethodGet().withUrl(CORPUSES_API)

const useCorpusesPage = () => {
    const { state, reload } = useHttpDataLoading<IGetCorpusesResponse>(GetAllCorpuses)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState<ICreateOrUpdateCorpusRequest>({ title: "" })
    const [editingId, setEditingId] = useState<number | null>(null)

    const submitHandler = async () => {
        if (editingId) {
            await updateCorpus()
        } else {
            await createCorpus()
        }
    }

    const openCreateHandler = () => {
        setFormData({ title: "" })
        setEditingId(null)
        setIsModalOpen(true)
    }

    const openUpdateHandler = async (id: number) => {
        const data = state as LoadSuccessStateType<IGetCorpusesResponse>
        const corpus = data.content.items.find((c) => c.id == id)
        if (!corpus) {
            throw new Error("Корпус не найден")
        }

        setFormData({ title: corpus.title })
        setEditingId(id)
        setIsModalOpen(true)
    }

    const deleteHandler = async () => {
        AlertService.error(`Work in progress...`)
    }

    const updateCorpus = async () => {
        const response = await new HttpClient()
            .withUrl(`${CORPUSES_API}${editingId}`)
            .withMethodPut()
            .withAuthorization()
            .withJsonBody(formData)
            .send()

        closeModal()

        if (response.hasError()) {
            const err = response.getError()
            AlertService.error(`Ошибка обновления корпуса: ${getErrorMessage(err)}`)
        } else {
            AlertService.success(`Корпус успешно обновлён`)
        }

        await reload()
    }

    const createCorpus = async () => {
        try {
            const response = await new HttpClient()
                .withUrl(CORPUSES_API)
                .withMethodPost()
                .withAuthorization()
                .withJsonBody(formData)
                .send<CreatedResponse>()

            closeModal()

            if (response.hasError()) {
                const err = response.getError()
                AlertService.error(`Ошибка создания корпуса: ${getErrorMessage(err)}`)
            } else {
                AlertService.success(`Создан корпус с Id = ${response.unwrap().createdId}`)
            }

            await reload()
        } catch {
            AlertService.error(`Ошибка создание корпуса: UNKNOWN`)
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setFormData({ title: "" })
        setEditingId(null)
    }

    const cancelHandler = async () => {
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

export default useCorpusesPage
