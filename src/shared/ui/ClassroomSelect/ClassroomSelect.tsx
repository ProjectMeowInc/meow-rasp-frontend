import { DataLoadingState } from "@/shared/hooks/useDataLoading"
import { IGetClassroomsResponse } from "@/shared/requests/classroomsRequests"
import ErrorReloadMessage from "@/shared/ui/ErrorReloadMessage/ErrorReloadMessage"
import InlinePreloader from "@/shared/ui/InlinePreloader/InlinePreloader"
import Select from "@/shared/ui/Select/Select"
import SelectItem from "@/shared/ui/Select/SelectItem"
import React from "react"

interface IClassroomSelectProps {
    classroomsState: DataLoadingState<IGetClassroomsResponse>
    selectedClassroom?: string
    onChange?: (value: string) => void
}

const ClassroomSelect: React.FC<IClassroomSelectProps> = ({ classroomsState, selectedClassroom, onChange }) => {
    if (classroomsState.isLoading) {
        return <InlinePreloader />
    }

    if (classroomsState.isError) {
        return <ErrorReloadMessage />
    }

    return (
        <Select placeholder="Выберите аудиторию" value={selectedClassroom} onChange={onChange}>
            {classroomsState.content.items.map((classroom) => (
                <SelectItem key={classroom.id} value={classroom.id.toString()}>
                    <strong>{classroom.title}</strong>
                </SelectItem>
            ))}
        </Select>
    )
}

export default ClassroomSelect
