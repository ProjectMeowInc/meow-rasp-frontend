import { DataLoadingState } from "@/shared/hooks/useDataLoading"
import { IGetTeachersResponse } from "@/shared/requests/teachersRequests"
import ErrorReloadMessage from "@/shared/ui/ErrorReloadMessage/ErrorReloadMessage"
import InlinePreloader from "@/shared/ui/InlinePreloader/InlinePreloader"
import Select from "@/shared/ui/Select/Select"
import SelectItem from "@/shared/ui/Select/SelectItem"
import React from "react"

interface ITeacherSelectProps {
    teachersState: DataLoadingState<IGetTeachersResponse>
    selectedTeacher?: string
}

const TeacherSelect: React.FC<ITeacherSelectProps> = ({ selectedTeacher, teachersState }) => {
    if (teachersState.isLoading) {
        return <InlinePreloader />
    }

    if (teachersState.isError) {
        return <ErrorReloadMessage />
    }

    return (
        <Select value={selectedTeacher} placeholder="Выберите преподавателя">
            {teachersState.content.items.map((teacher: { id: number; name: string }) => (
                <SelectItem key={teacher.id} value={teacher.id.toString()}>
                    <strong>{teacher.name}</strong>
                </SelectItem>
            ))}
        </Select>
    )
}

export default TeacherSelect
