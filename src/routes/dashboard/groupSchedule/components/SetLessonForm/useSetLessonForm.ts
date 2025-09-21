import { useEffectAsync } from "@/shared/hooks/useEffectAsync"
import { useHttpDataLoading, useHttpDataLoadingWithMap } from "@/shared/hooks/useDataLoading"
import { IGetClassroomsResponse, GetAllClassroomsRequest } from "@/shared/requests/classroomsRequests"
import {
    GetAllGroupDisciplinesRequest,
    GetDateScheduleWithNumberRequest,
    IGetDateScheduleWithNumberResponse,
    IGetGroupDisciplinesResponse,
} from "@/shared/requests/groupRequests"
import { IGetTeachersResponse, GetAllTeachersRequest } from "@/shared/requests/teachersRequests"
import { AlertService } from "@/shared/services/AlertService"
import { useState } from "react"
import { LessonType } from "../../useGroupScheduleDashboard"

export interface LessonFormData {
    disciplineId: number
    teacherId: number
    classroomId: number
    lessonType: LessonType
}

export interface ISlot {
    date: string
    number: number
}

interface UseSetLessonFormOptions {
    slot: ISlot
    groupId: number
    initialData?: Partial<LessonFormData>
    onSubmit: (data: LessonFormData) => void
    onCancel: () => void
}

const useSetLessonForm = ({ slot, groupId, initialData, onSubmit, onCancel }: UseSetLessonFormOptions) => {
    const { state: slotState } = useHttpDataLoadingWithMap<
        IGetDateScheduleWithNumberResponse,
        { teacherId: number; disciplineId: number; classroomId: number; lessonType: LessonType } | undefined
    >(GetDateScheduleWithNumberRequest(groupId, slot.date, slot.number), (res) => {
        const schedule = res.items.find((sch) => sch.number == slot.number)
        if (!schedule) {
            return
        }

        return {
            teacherId: schedule.teacher.id,
            disciplineId: schedule.discipline.id,
            classroomId: schedule.classroom.id,
            lessonType: schedule.lessonType,
        }
    })
    const { state: disciplinesState } = useHttpDataLoading<IGetGroupDisciplinesResponse>(
        GetAllGroupDisciplinesRequest(groupId),
    )
    const { state: teachersState } = useHttpDataLoading<IGetTeachersResponse>(GetAllTeachersRequest)
    const { state: classroomsState } = useHttpDataLoading<IGetClassroomsResponse>(GetAllClassroomsRequest)
    const [disciplineId, setDisciplineId] = useState<number | undefined>(initialData?.disciplineId)
    const [teacherId, setTeacherId] = useState<number | undefined>(initialData?.teacherId)
    const [classroomId, setClassroomId] = useState<number | undefined>(initialData?.classroomId)
    const [lessonType, setLessonType] = useState<LessonType | undefined>(initialData?.lessonType)

    useEffectAsync(async () => {
        if (!slotState.isLoading && !slotState.isError) {
            const state = slotState.content
            // todo: add logs or error display?
            if (!state) {
                return
            }
            setDisciplineId(state.disciplineId)
            setTeacherId(state.teacherId)
            setClassroomId(state.classroomId)
            setLessonType(state.lessonType)
        }
    }, [slotState])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!disciplineId || !teacherId || !classroomId || !lessonType) {
            return AlertService.error("Все поля должны быть заполнены")
        }
        onSubmit({ disciplineId, teacherId, classroomId, lessonType })
    }

    const handleCancel = () => {
        onCancel()
    }

    return {
        slotState,
        disciplinesState,
        teachersState,
        classroomsState,
        disciplineId,
        setDisciplineId,
        teacherId,
        setTeacherId,
        classroomId,
        setClassroomId,
        lessonType,
        setLessonType,
        handleSubmit,
        handleCancel,
    }
}

export default useSetLessonForm
