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
import { GetLessonByIdRequest, IGetLessonByIdResposne } from "@/shared/requests/lessonRequests"
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
    lessonId?: number
    initialData?: Partial<LessonFormData>
    onSubmit: (data: LessonFormData) => void
    onCancel: () => void
}

const useSetLessonForm = ({ slot, groupId, lessonId, initialData, onSubmit, onCancel }: UseSetLessonFormOptions) => {
    // If lessonId is provided, we're editing an existing lesson - use GetLessonByIdRequest
    // Otherwise, we're creating a new lesson - use GetDateScheduleWithNumberRequest
    const { state: slotState } = useHttpDataLoadingWithMap<
        IGetDateScheduleWithNumberResponse | IGetLessonByIdResposne,
        { teacherId: number; disciplineId: number; classroomId: number; lessonType: LessonType } | undefined
    >(
        lessonId ? GetLessonByIdRequest(lessonId) : GetDateScheduleWithNumberRequest(groupId, slot.date, slot.number),
        (res) => {
            if (lessonId) {
                // Editing existing lesson - response is IGetLessonByIdResposne
                const lesson = res as IGetLessonByIdResposne
                return {
                    teacherId: lesson.teacher.id,
                    disciplineId: lesson.discipline.id,
                    classroomId: lesson.classroom.id,
                    lessonType: lesson.lessonType,
                }
            } else {
                // Creating new lesson - response is IGetDateScheduleWithNumberResponse
                const scheduleResponse = res as IGetDateScheduleWithNumberResponse
                const schedule = scheduleResponse.items.find((sch) => sch.number == slot.number)
                if (!schedule) {
                    return
                }

                return {
                    teacherId: schedule.teacher.id,
                    disciplineId: schedule.discipline.id,
                    classroomId: schedule.classroom.id,
                    lessonType: schedule.lessonType,
                }
            }
        },
    )
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
