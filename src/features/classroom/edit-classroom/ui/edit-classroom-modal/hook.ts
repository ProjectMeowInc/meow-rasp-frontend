import { UpdateClassroomPayload } from "@/entities/classroom"
import { useHttpDataLoading } from "@/shared/hooks/useDataLoading"
import { OnCloseFn } from "@/shared/types"
import { useState } from "react"
import { useUpdateClassroom } from "../../hooks"
import { GetAllCorpusesRequest, GetAllCorpusesResponse } from "@/entities/corpus"

export const useEditClassroomModal = (classroomId: number, onClose: OnCloseFn) => {
    const [formData, setFormData] = useState<UpdateClassroomPayload>({
        title: "",
        corpusId: 0,
    })
    const [error, setError] = useState<string>()
    const { state: corpusesState } = useHttpDataLoading<GetAllCorpusesResponse>(GetAllCorpusesRequest())
    const { updateClassroom } = useUpdateClassroom()

    const submitHandler = async () => {
        setError(undefined)

        if (!formData.title && !formData.corpusId) {
            return setError("Все поля должны быть заполнены")
        }

        const res = await updateClassroom(classroomId, formData)

        if (res.hasError()) {
            setError(res.getError())
        } else {
            onClose({ reason: "submit" })
        }
    }

    return {
        error,
        formData,
        corpusesState,
        submitHandler,
        setFormData,
    }
}
