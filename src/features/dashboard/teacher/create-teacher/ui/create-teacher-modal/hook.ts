import { useCreateTeacher } from "@/features/dashboard/teacher/create-teacher"
import { useState } from "react"
import { AlertService } from "@/shared/services/AlertService"
import { OnCloseFn } from "@/shared/types"

export const useCreateTeacherModal = (onClose: OnCloseFn) => {
    const { createTeacher } = useCreateTeacher()
    const [name, setName] = useState("")
    const [error, setError] = useState<string>("")

    const submitHandler = async () => {
        const res = await createTeacher({ name: name })

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
