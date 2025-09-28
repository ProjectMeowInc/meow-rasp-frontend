import { UpdateLessonPayload } from "@/entities/lesson"
import { useState } from "react"
import { useUpdateLesson } from "../../hooks"
import { useGetClassrooms } from "@/features/classroom/get-classrooms"
import { useGetGroupDisciplines } from "@/features/group/get-disciplines"
import { useGetTeachers } from "@/features/teacher/get-teachers"
import { useGetLessons } from "../../../get-lessons"
import { useFirstLoadingAsync } from "@/shared/hooks/useFirstLoading"
import { OnCloseFn } from "@/shared/types"

export const useUpdateLessonModal = (groupId: number, lessonId: number, date: string, onClose: OnCloseFn) => {
    const [formData, setFormData] = useState<UpdateLessonPayload | null>(null)
    const [error, setError] = useState<string>()

    const { useGetAllClassroomsLoading } = useGetClassrooms()
    const { state: classroomsState } = useGetAllClassroomsLoading()

    const { useGetGroupDisciplinesLoading } = useGetGroupDisciplines()
    const { state: disciplinesState } = useGetGroupDisciplinesLoading(groupId)

    const { useGetAllTeachersLoading } = useGetTeachers()
    const { state: teachersState } = useGetAllTeachersLoading()

    const { getLessonById } = useGetLessons()

    useFirstLoadingAsync(async () => {
        const res = await getLessonById(lessonId)
        if (res.hasError()) {
            return setError(res.getError())
        }

        const lesson = res.unwrap()
        setFormData({
            date,
            number: lesson.number,
            disciplineId: lesson.discipline.id,
            teacherId: lesson.teacher.id,
            classroomId: lesson.classroom.id,
            lessonType: lesson.lessonType,
        })
    })

    const { updateLesson } = useUpdateLesson()

    const submitHandler = async () => {
        setError(undefined)

        if (
            !formData?.date ||
            !formData?.number ||
            !formData?.disciplineId ||
            !formData?.teacherId ||
            !formData?.classroomId
        ) {
            return setError("Все поля должны быть заполнены")
        }

        const res = await updateLesson(lessonId, formData)
        if (res.hasError()) {
            setError(res.getError())
        } else {
            onClose({ reason: "submit" })
        }
    }

    return {
        formData,
        error,
        classroomsState,
        disciplinesState,
        teachersState,
        setFormData,
        submitHandler,
    }
}
