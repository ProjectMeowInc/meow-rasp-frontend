import { LESSONS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"
import { getErrorMessage } from "@/shared/hooks/useDataLoading"
import { AlertService } from "@/shared/services/AlertService"
import { useState } from "react"
import { Slot } from "../../../widgets/dashboard/set-lesson-form/hook"
import { LessonType } from "@/entities/lesson"
import { CreateLessonPayload } from "@/entities/lesson"
import { useGetSchedule } from "@/features/dashboard/group/get-schedule"

export const useGroupScheduleDashboard = (groupId: number, startDate: string, endDate: string) => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingSlot, setEditingSlot] = useState<Slot | null>(null)
    const [editingLessonId, setEditingLessonId] = useState<number | null>(null)

    const { useGetGroupScheduleLoading } = useGetSchedule()
    const { state: scheduleState, reload: reloadSchedule } = useGetGroupScheduleLoading(groupId, startDate, endDate)

    const openFormHandler = (slot: Slot, lessonId?: number) => {
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
            const requestData: CreateLessonPayload = {
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
        openFormHandler,
        closeFormHandler,
        submitHandler,
    }
}
