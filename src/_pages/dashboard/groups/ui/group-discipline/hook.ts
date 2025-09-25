import { getErrorMessage, useHttpDataLoading } from "@/shared/hooks/useDataLoading"
import { AlertService } from "@/shared/services/AlertService"
import { useState } from "react"
import { useEffectAsync } from "@/shared/hooks/useEffectAsync"
import { DisciplineTypePayload } from "@/entities/discipline"
import { GetGroupDisciplinesRequest, GetGroupDisciplinesResponse } from "@/entities/group"
import { GetAllTeachersRequest, GetAllTeachersResponse } from "@/entities/teacher"
import { CreateDisciplineRequest, CreateDisciplineResponse } from "@/entities/discipline"

interface ICreateOrUpdateDisciplineRequest {
    title: string
    disciplineType: DisciplineTypePayload
    lessonsCount: number
    teacherId: number
    groupId: number
}

const useGroupDiscipline = (groupId: number) => {
    const EmptyFormData: ICreateOrUpdateDisciplineRequest = {
        title: "",
        disciplineType: "shared",
        lessonsCount: -1,
        teacherId: -1,
        groupId,
    }

    const { state, reload } = useHttpDataLoading<GetGroupDisciplinesResponse>(GetGroupDisciplinesRequest(groupId))
    const { state: teachersState } = useHttpDataLoading<GetAllTeachersResponse>(GetAllTeachersRequest())
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState<ICreateOrUpdateDisciplineRequest>(EmptyFormData)
    const [editingId, setEditingId] = useState<number | null>(null)

    const submitHandler = async () => {
        if (editingId) {
            await updateDiscipline()
        } else {
            await createDiscipline()
        }
    }

    const openCreateHandler = () => {
        setFormData(EmptyFormData)
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
        try {
            const response = await CreateDisciplineRequest(formData).send<CreateDisciplineResponse>()

            closeModal()

            if (response.hasError()) {
                const err = response.getError()
                AlertService.error(`Ошибка создания дисциплины: ${getErrorMessage(err)}`)
            } else {
                AlertService.success(`Создана дисциплина с Id = ${response.unwrap().createdId}`)
            }

            await reload()
        } catch {
            AlertService.error(`Ошибка создание дисциплины: UNKNOWN`)
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setFormData(EmptyFormData)
        setEditingId(null)
    }

    const cancelHandler = () => {
        closeModal()
    }

    useEffectAsync(async () => {
        await reload()
    }, [groupId])

    return {
        state,
        teachersState,
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

export default useGroupDiscipline
