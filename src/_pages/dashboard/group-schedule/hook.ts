import { useState } from "react"
import { useGetSchedule } from "@/features/dashboard/group/get-schedule"
import { useDeleteLesson } from "@/features/dashboard/lesson/delete-lesson"
import { AlertService } from "@/shared/services/AlertService"

interface Slot {
    date: string
    number: number
}

export const useGroupScheduleDashboard = (groupId: number, startDate: string, endDate: string) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingSlot, setEditingSlot] = useState<Slot | null>(null)
    const [editingLessonId, setEditingLessonId] = useState<number>()
    const { deleteLesson } = useDeleteLesson()

    const { useGetGroupScheduleLoading } = useGetSchedule()
    const { state: scheduleState, reload: reloadSchedule } = useGetGroupScheduleLoading(groupId, startDate, endDate)

    const openModalHandler = (date: string, number: number, lessonId?: number) => {
        if (lessonId) {
            openEditModalHandler({ date, number }, lessonId)
        } else {
            openCreateModalHandler({ date, number })
        }
    }

    const deleteLessonHandler = async (lessonId: number) => {
        const res = await deleteLesson(lessonId)
        if (res.hasError()) {
            AlertService.error(`Ошибка удаления пары: ${res.getError()}`)
        } else {
            AlertService.success(`Пара с Id = ${lessonId} удалена`)
        }
        await reloadSchedule()
    }

    const openCreateModalHandler = (slot: Slot) => {
        setEditingSlot(slot)
        setIsModalOpen(true)
    }

    const openEditModalHandler = (slot: Slot, lessonId: number) => {
        setEditingSlot(slot)
        setIsModalOpen(true)
        setEditingLessonId(lessonId)
    }

    const submitHandler = async () => {
        setIsModalOpen(false)
        setEditingSlot(null)
        setEditingLessonId(undefined)
        await reloadSchedule()
    }

    return {
        isModalOpen,
        editingSlot,
        editingLessonId,
        scheduleState,
        openModalHandler,
        submitHandler,
        deleteLessonHandler,
    }
}
