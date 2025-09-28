import { CreateOrUpdateLessonPayload } from "@/entities/lesson"
import { useHttpDataLoading } from "@/shared/hooks/useDataLoading"
import { useState } from "react"
import { useCreateLesson } from "../../hooks"
import { GetAllTeachersRequest, GetAllTeachersResponse } from "@/entities/teacher"
import { GetAllClassroomRequest, GetAllClassroomResponse } from "@/entities/classroom"
import { GetGroupDisciplinesRequest, GetGroupDisciplinesResponse } from "@/entities/group"
import { OnCloseFn } from "@/shared/types"

export const useCreateLessonModal = (groupId: number, date: string, number: number, onClose: OnCloseFn) => {
    const [formData, setFormData] = useState<CreateOrUpdateLessonPayload>({
        date,
        number,
        disciplineId: 0,
        teacherId: 0,
        classroomId: 0,
        lessonType: {
            type: "shared",
        },
    })
    const [error, setError] = useState<string>()
    const { state: disciplinesState } = useHttpDataLoading<GetGroupDisciplinesResponse>(
        GetGroupDisciplinesRequest(groupId),
    )
    const { state: teachersState } = useHttpDataLoading<GetAllTeachersResponse>(GetAllTeachersRequest())
    const { state: classroomsState } = useHttpDataLoading<GetAllClassroomResponse>(GetAllClassroomRequest())
    const { createLesson } = useCreateLesson()

    const submitHandler = async () => {
        setError(undefined)

        if (
            !formData.date ||
            !formData.number ||
            !formData.disciplineId ||
            !formData.teacherId ||
            !formData.classroomId
        ) {
            return setError("Все поля должны быть заполнены")
        }

        const res = await createLesson(formData)
        if (res.hasError()) {
            setError(res.getError())
        } else {
            onClose({ reason: "submit" })
        }
    }

    return {
        formData,
        error,
        disciplinesState,
        teachersState,
        classroomsState,
        setFormData,
        submitHandler,
    }
}
