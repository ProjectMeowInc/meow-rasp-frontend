import { GetAllTeachersResponse } from "@/entities/teacher"
import { DataLoadingState } from "@/shared/hooks/useDataLoading"
import ErrorReloadMessage from "@/shared/ui/error-reload-message"
import InlinePreloader from "@/shared/ui/inline-preloader"
import Select, { SelectItem } from "@/shared/ui/select"
import React from "react"

interface ITeacherSelectProps {
    teachersState: DataLoadingState<GetAllTeachersResponse>
    selectedTeacher?: string
    onChange?: (value: string) => void
}

export const TeacherSelect: React.FC<ITeacherSelectProps> = ({ selectedTeacher, teachersState, onChange }) => {
    if (teachersState.isLoading) {
        return <InlinePreloader />
    }

    if (teachersState.isError) {
        return <ErrorReloadMessage />
    }

    return (
        <Select value={selectedTeacher} placeholder="Выберите преподавателя" onChange={onChange}>
            {teachersState.content.items.map((teacher: { id: number; name: string }) => (
                <SelectItem key={teacher.id} value={teacher.id.toString()}>
                    <strong>{teacher.name}</strong>
                </SelectItem>
            ))}
        </Select>
    )
}
