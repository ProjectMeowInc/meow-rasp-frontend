import { LESSONS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"
import { getErrorMessage } from "@/shared/hooks/useDataLoading"
import { AlertService } from "@/shared/services/AlertService"
import { useState } from "react"
import { ISlot } from "./components/SetLessonForm/useSetLessonForm"
import { GetGroupScheduleRequest, IGetGroupScheduleResponse } from "@/shared/requests/groupRequests"
import { useHttpDataLoading } from "@/shared/hooks/useDataLoading"

export interface ICreateLessonPayload {
    disciplineId: number
    teacherId: number
    classroomId: number
    lessonType: LessonType
    date: string
    number: number
}

export type LessonType =
    | {
          type: "shared"
      }
    | {
          type: "devided"
          subgroup: number
      }

export const useGroupScheduleDashboard = (groupId: number, startDate: string, endDate: string) => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingSlot, setEditingSlot] = useState<ISlot | null>(null)
    const [editingLessonId, setEditingLessonId] = useState<number | null>(null)

    const { state: scheduleState, reload: reloadSchedule } = useHttpDataLoading<IGetGroupScheduleResponse>(
        GetGroupScheduleRequest(groupId, startDate, endDate),
    )

    const openFormHandler = (slot: ISlot, lessonId?: number) => {
        setEditingSlot(slot)
        setIsFormOpen(true)
        setEditingLessonId(lessonId ?? null)
    }

    const closeFormHandler = () => {
        setIsFormOpen(false)
        setEditingSlot(null)
    }

    const submitHandler = async (data: {
        disciplineId: number
        teacherId: number
        classroomId: number
        lessonType: LessonType
    }) => {
        if (!editingSlot) return

        try {
            const requestData: ICreateLessonPayload = {
                ...data,
                date: editingSlot.date,
                number: editingSlot.number,
            }

            const response = await new HttpClient()
                .withUrl(LESSONS_API)
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

            await reloadSchedule()
        } catch {
            AlertService.error(`Ошибка установки занятия: UNKNOWN`)
        }
    }

    return {
        isFormOpen,
        editingSlot,
        editingLessonId,
        scheduleState,
        isLoading: scheduleState.isLoading,
        openFormHandler,
        closeFormHandler,
        submitHandler,
        refetchSchedule: reloadSchedule,
    }
}
