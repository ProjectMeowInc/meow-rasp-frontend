import { AlertService } from "@/shared/services/AlertService"
import { useState } from "react"
import { useGetTeachers } from "@/features/dashboard/teacher/get-teachers"

const useTeacherDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)
    const { useGetAllTeachersLoading } = useGetTeachers()
    const { state, reload } = useGetAllTeachersLoading()

    const submitHandler = async () => {
        setIsModalOpen(false)
        await reload()
    }

    const openCreateHandler = () => {
        setEditingId(null)
        setIsModalOpen(true)
    }

    const openUpdateHandler = (id: number) => {
        setEditingId(id)
        setIsModalOpen(true)
    }

    const deleteHandler = async () => {
        AlertService.error(`Work in progress...`)
    }

    return {
        state,
        isModalOpen,
        editingId,
        deleteHandler,
        openCreateHandler,
        openUpdateHandler,
        submitHandler,
    }
}

export default useTeacherDashboard
