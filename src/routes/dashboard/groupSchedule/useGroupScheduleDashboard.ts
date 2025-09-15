import { GROUPS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"
import { getErrorMessage } from "@/shared/hooks/useDataLoading"
import { AlertService } from "@/shared/services/AlertService"
import { useState } from "react"
import { ISlot } from "./components/SetLessonForm/useSetLessonForm"

interface ISetLessonRequest {
    disciplineId: number
    teacherId: number
    classroomId: number
    subgroup: string
    date: string
    slot: number
}

export const useGroupScheduleDashboard = (groupId: number) => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingSlot, setEditingSlot] = useState<ISlot | null>(null)

    const openFormHandler = (slot: ISlot) => {
        setEditingSlot(slot)
        setIsFormOpen(true)
    }

    const closeFormHandler = () => {
        setIsFormOpen(false)
        setEditingSlot(null)
    }

    const submitHandler = async (data: {
        disciplineId: number
        teacherId: number
        classroomId: number
        subgroup: string
    }) => {
        if (!editingSlot) return

        try {
            const requestData: ISetLessonRequest = {
                ...data,
                date: editingSlot.date,
                slot: editingSlot.number,
            }

            const response = await new HttpClient()
                .withUrl(`${GROUPS_API}${groupId}/schedule/lesson`)
                .withMethodPost()
                .withAuthorization()
                .withJsonBody(requestData)
                .send()

            closeFormHandler()

            if (response.hasError()) {
                const err = response.getError()
                AlertService.error(`Ошибка установки занятия: ${getErrorMessage(err)}`)
            } else {
                AlertService.success(`Занятие успешно установлено`)
            }
        } catch {
            AlertService.error(`Ошибка установки занятия: UNKNOWN`)
        }
    }

    return {
        isFormOpen,
        editingSlot,
        openFormHandler,
        closeFormHandler,
        submitHandler,
    }
}
