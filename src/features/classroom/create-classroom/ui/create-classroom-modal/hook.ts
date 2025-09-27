import { CreateClassroomPayload } from "@/entities/classroom"
import { GetAllCorpusesRequest, GetAllCorpusesResponse } from "@/entities/corpus"
import { useHttpDataLoading } from "@/shared/hooks/useDataLoading"
import { useState } from "react"
import { useCreateClassroom } from "../../hooks"

export const useCreateClassroomModal = (onClose: () => void) => {
    const [formData, setFormData] = useState<CreateClassroomPayload>({
        title: "",
        corpusId: 0,
    })
    const [error, setError] = useState<string>()
    const { state: corpusesState } = useHttpDataLoading<GetAllCorpusesResponse>(GetAllCorpusesRequest())
    const { createClassroom } = useCreateClassroom()

    const submitHandler = async () => {
        setError(undefined)

        if (!formData.title || !formData.corpusId) {
            return setError("Все поля должны быть заполнены")
        }

        const res = await createClassroom(formData)
        if (res.hasError()) {
            setError(res.getError())
        } else {
            onClose()
        }
    }

    return {
        formData,
        error,
        corpusesState,
        setFormData,
        submitHandler,
    }
}
