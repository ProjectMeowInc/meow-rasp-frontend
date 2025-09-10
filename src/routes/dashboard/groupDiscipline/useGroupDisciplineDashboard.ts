import { GROUPS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"
import { useHttpDataLoading } from "@/shared/hooks/useDataLoading"
import { DisciplineTypePayload } from "@/shared/models/responses"
import { useState } from "react"

interface IGetGroupDisciplinesResponse {
    items: {
        id: number
        title: string
        lessonsCount: number
        disciplineType: DisciplineTypePayload
        teacher: {
            id: number
            name: string
        }
    }[]
}

interface ICreateOrUpdateDisciplineRequest {
    title: string
    teacher: string
}

const useGroupDisciplineDashboard = (group_id: number) => {
    const GetAllGroupDisciplines = new HttpClient().withMethodGet().withUrl(`${GROUPS_API}${group_id}/disciplines`)

    const { state } = useHttpDataLoading<IGetGroupDisciplinesResponse>(GetAllGroupDisciplines)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState<ICreateOrUpdateDisciplineRequest>({ title: "", teacher: "" })
    const [editingId, setEditingId] = useState<number | null>(null)

    const submitHandler = async () => {
        if (editingId) {
            await updateDiscipline()
        } else {
            await createDiscipline()
        }
    }

    const openCreateHandler = () => {
        setFormData({ title: "", teacher: "" })
        setEditingId(null)
        setIsModalOpen(true)
    }

    const openUpdateHandler = async () => {
        throw new Error("WIP")
    }

    const deleteHandler = async () => {
        throw new Error("WIP")
        // const response = await new HttpClient()
        //     .withUrl(`${GROUP_DISCIPLINES_API}${id}`)
        //     .withMethodDelete()
        //     .withAuthorization()
        //     .send()

        // if (response.hasError()) {
        //     const err = response.getError()
        //     AlertService.error(`Ошибка удаления дисциплины: ${getErrorMessage(err)}`)
        // } else {
        //     AlertService.success(`Дисциплина удалена`)
        // }

        // await reload()
    }

    const updateDiscipline = async () => {
        throw new Error("WIP")

        // const response = await new HttpClient()
        //     .withUrl(`${GROUP_DISCIPLINES_API}${editingId}`)
        //     .withMethodPut()
        //     .withAuthorization()
        //     .withJsonBody(formData)
        //     .send()

        // closeModal()

        // if (response.hasError()) {
        //     const err = response.getError()
        //     AlertService.error(`Ошибка обновления дисциплины: ${getErrorMessage(err)}`)
        // } else {
        //     AlertService.success(`Дисциплина успешно обновлена`)
        // }

        // await reload()
    }

    const createDiscipline = async () => {
        throw new Error("WIP")
        // try {
        //     const response = await new HttpClient()
        //         .withUrl(GROUP_DISCIPLINES_API)
        //         .withMethodPost()
        //         .withAuthorization()
        //         .withJsonBody(formData)
        //         .send<ICreatedResponse>()

        //     closeModal()

        //     if (response.hasError()) {
        //         const err = response.getError()
        //         AlertService.error(`Ошибка создания дисциплины: ${getErrorMessage(err)}`)
        //     } else {
        //         AlertService.success(`Создана дисциплина с Id = ${response.unwrap().createdId}`)
        //     }

        //     await reload()
        // } catch {
        //     AlertService.error(`Ошибка создание дисциплины: UNKNOWN`)
        // }
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setFormData({ title: "", teacher: "" })
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

export default useGroupDisciplineDashboard
