import { useState } from "react"
import { AlertService } from "@/shared/services/AlertService"
import { OnCloseFn } from "@/shared/types"
import { useEditTeacher } from "@/features/teacher/edit-teacher"

export const useEditTeacherModal = (id: number, onClose: OnCloseFn) => {
    const { editTeacher } = useEditTeacher()
    const [name, setName] = useState("")
    const [error, setError] = useState<string>("")

    const submitHandler = async () => {
        const res = await editTeacher(id, { name: name })

        if (res.hasError()) {
            return setError(res.getError())
        } else {
            AlertService.success("Учитель был успешно создан")
            onClose()
        }
    }

    return {
        name,
        error,
        submitHandler,
        setName,
    }
}
