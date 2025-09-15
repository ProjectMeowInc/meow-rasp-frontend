import { useHttpDataLoading, useHttpDataLoadingWithMap } from "@/shared/hooks/useDataLoading"
import { IGetClassroomsResponse, GetAllClassroomsRequest } from "@/shared/requests/classroomsRequests"
import {
    GetAllGroupDisciplinesRequest,
    GetDateScheduleWithNumber,
    IGetDateScheduleWithNumberResponse,
    IGetGroupDisciplinesResponse,
} from "@/shared/requests/groupRequests"
import { IGetTeachersResponse, GetAllTeachersRequest } from "@/shared/requests/teachersRequests"
import { SubgroupType } from "@/shared/ui/SubgroupSelect/SubgroupSelect"
import { useState } from "react"

export interface LessonFormData {
    disciplineId: number
    teacherId: number
    classroomId: number
    subgroup: SubgroupType
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
    const { state: slotState } = useHttpDataLoadingWithMap<IGetDateScheduleWithNumberResponse, { teacherId: number, disciplineId: number, classroomId: number, subgroup: SubgroupType } | undefined>(GetDateScheduleWithNumber(groupId, slot.date, slot.number), (res) => {
        const schedule = res.items.find(sch => sch.number == slot.number)
        if (!schedule) {
            return
        }

        return {
            teacherId: schedule.teacher.id,
            disciplineId: schedule.discipline.id,
            classroomId: schedule.classroom.id,
            // todo: fix this
            subgroup: "both"
        }
    })
    const { state: disciplinesState } = useHttpDataLoading<IGetGroupDisciplinesResponse>(
        GetAllGroupDisciplinesRequest(groupId),
    )
    const { state: teachersState } = useHttpDataLoading<IGetTeachersResponse>(GetAllTeachersRequest)
    const { state: classroomsState } = useHttpDataLoading<IGetClassroomsResponse>(GetAllClassroomsRequest)
    const [disciplineId, setDisciplineId] = useState(initialData?.disciplineId ?? 0)
    const [teacherId, setTeacherId] = useState(initialData?.teacherId ?? 0)
    const [classroomId, setClassroomId] = useState(initialData?.classroomId ?? 0)
    const [subgroup, setSubgroup] = useState<SubgroupType>(initialData?.subgroup ?? "both")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!disciplineId || !teacherId || !classroomId) return
        onSubmit({ disciplineId, teacherId, classroomId, subgroup })
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
        subgroup,
        setSubgroup,
        handleSubmit,
        handleCancel,
    }
}

export default useSetLessonForm
