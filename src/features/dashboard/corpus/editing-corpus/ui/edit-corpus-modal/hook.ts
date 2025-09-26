import { UpdateCorpusPayload } from "@/entities/corpus"
import { useState } from "react"
import { useEditCorpus } from "@/features/dashboard/corpus/editing-corpus"
import { AlertService } from "@/shared/services/AlertService"

export const useEditCorpusModal = (corpusId: number, onClose: () => void) => {
    const [formData, setFormData] = useState<UpdateCorpusPayload>({
        title: "",
    })
    const [error, setError] = useState<string>()
    const { editCorpus } = useEditCorpus()

    const submitHandler = async () => {
        setError(undefined)

        if (!formData.title) {
            return setError("Все поля должны быть заполнены")
        }

        const res = await editCorpus(corpusId, formData)
        if (res.hasError()) {
            setError(res.getError())
        } else {
            AlertService.success(`Корпус с id = ${corpusId} был успешно обновлён`)
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
