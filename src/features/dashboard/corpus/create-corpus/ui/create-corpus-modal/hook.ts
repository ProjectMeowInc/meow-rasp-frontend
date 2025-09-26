import { CreateCorpusPayload } from "@/entities/corpus"
import { useState } from "react"
import { useCreateCorpus } from "@/features/dashboard/corpus/create-corpus"
import { AlertService } from "@/shared/services/AlertService"

export const useCreateCorpusModal = (onClose: () => void) => {
    const [formData, setFormData] = useState<CreateCorpusPayload>({
        title: "",
    })
    const [error, setError] = useState<string>()
    const { createCorpus } = useCreateCorpus()

    const submitHandler = async () => {
        setError(undefined)

        if (!formData.title) {
            return setError("Все поля должны быть заполнены")
        }

        const res = await createCorpus(formData)
        if (res.hasError()) {
            setError(res.getError())
        } else {
            AlertService.success("Корпус был успешно создан")
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
