"use client"

import { UpdateGroupPayload } from "@/entities/group"
import { OnCloseFn } from "@/shared/types"
import { useState } from "react"
import { useEditGroup } from "../../hooks"

export const useEditGroupModal = (groupId: number, onClose: OnCloseFn) => {
    const [formData, setFormData] = useState<UpdateGroupPayload>({
        title: "",
    })
    const { editGroup } = useEditGroup()
    const [error, setError] = useState<string>()

    const submitHandler = async () => {
        setError(undefined)

        if (!formData.title.length) {
            return setError("Все поля должны быть заполнены")
        }

        const res = await editGroup(groupId, formData)
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
