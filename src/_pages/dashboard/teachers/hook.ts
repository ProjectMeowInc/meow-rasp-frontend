import { AlertService } from "@/shared/services/AlertService"
import { useState } from "react"
import { useGetTeachers } from "@/features/teacher/get-teachers"
import { CloseModalEvent } from "@/shared/types"

const useTeacherDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)
    const { useGetAllTeachersLoading } = useGetTeachers()
    const { state, silentReload } = useGetAllTeachersLoading()

    const closeModalHandler = async (ctx: CloseModalEvent) => {
        setIsModalOpen(false)
        if (ctx.reason === "submit") {
            await silentReload()
        }
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
        closeModalHandler,
    }
}

export default useTeacherDashboard
