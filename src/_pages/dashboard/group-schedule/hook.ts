import { useState } from "react"
import { useGetSchedule } from "@/features/dashboard/group/get-schedule"

interface Slot {
    date: string
    number: number
}

export const useGroupScheduleDashboard = (groupId: number, startDate: string, endDate: string) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingSlot, setEditingSlot] = useState<Slot | null>(null)
    const [editingLessonId, setEditingLessonId] = useState<number | null>(null)

    const { useGetGroupScheduleLoading } = useGetSchedule()
    const { state: scheduleState, reload: reloadSchedule } = useGetGroupScheduleLoading(groupId, startDate, endDate)

    const openFormHandler = (slot: Slot, lessonId?: number) => {
        setEditingSlot(slot)
        setIsModalOpen(true)
        setEditingLessonId(lessonId ?? null)
    }

    const closeFormHandler = () => {
        setIsModalOpen(false)
        setEditingSlot(null)
    }

    const submitHandler = async () => {
        await reloadSchedule()
        setIsModalOpen(false)
    }

    return {
        isModalOpen,
        editingSlot,
        editingLessonId,
        scheduleState,
        openFormHandler,
        closeFormHandler,
        submitHandler,
    }
}
