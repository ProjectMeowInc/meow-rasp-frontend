import { CreateGroupPayload } from "@/entities/group"
import { useState } from "react"
import { useCreateGroup } from "../../hooks"
import { OnCloseFn } from "@/shared/types"

export const useCreateGroupModal = (onClose: OnCloseFn) => {
    const [formData, setFormData] = useState<CreateGroupPayload>({
        title: "",
    })
    const { createGroup } = useCreateGroup()
    const [error, setError] = useState<string>()

    const submitHandler = async () => {
        setError(undefined)

        if (!formData.title.length) {
            return setError("Все поля должны быть заполнены")
        }

        const res = await createGroup(formData)
        if (res.hasError()) {
            setError(res.getError())
        } else {
            onClose()
        }
    }

    return {
        formData,
        error,
        setFormData,
        submitHandler,
    }
}
