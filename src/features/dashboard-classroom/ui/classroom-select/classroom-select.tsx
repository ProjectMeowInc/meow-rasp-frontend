import { GetAllClassroomResponse } from "@/entities/classroom"
import { DataLoadingState } from "@/shared/hooks/useDataLoading"
import ErrorReloadMessage from "@/shared/ui/error-reload-message"
import InlinePreloader from "@/shared/ui/inline-preloader"
import Select, { SelectItem } from "@/shared/ui/select"
import React from "react"

interface IClassroomSelectProps {
    classroomsState: DataLoadingState<GetAllClassroomResponse>
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
        <Select supportSearch placeholder="Выберите аудиторию" value={selectedClassroom} onChange={onChange}>
            {classroomsState.content.items.map((classroom) => (
                <SelectItem
                    searchValue={[classroom.id.toString(), classroom.title]}
                    key={classroom.id}
                    value={classroom.id.toString()}
                >
                    <strong>{classroom.title}</strong>
                </SelectItem>
            ))}
        </Select>
    )
}

export default ClassroomSelect
