import { GetAllClassroomResponse } from "@/entities/classroom"
import { DataLoadingState } from "@/shared/hooks/useDataLoading"
import ErrorReloadMessage from "@/shared/ui/error-reload-message"
import InlinePreloader from "@/shared/ui/inline-preloader"
import Select, { SelectItem } from "@/shared/ui/select"
import React from "react"

const ClassroomSelect: React.FC<{
    classroomsState: DataLoadingState<GetAllClassroomResponse>
    selectedClassroom?: number
    onChange?: (id: number) => void
}> = ({ classroomsState, selectedClassroom, onChange }) => {
    if (classroomsState.isLoading) {
        return <InlinePreloader />
    }

    if (classroomsState.isError) {
        return <ErrorReloadMessage />
    }

    return (
        <Select
            supportSearch
            placeholder="Выберите аудиторию"
            value={selectedClassroom}
            onChange={(val) => onChange?.(parseInt(val))}
        >
            {classroomsState.content.items.map((classroom) => (
                <SelectItem
                    searchValue={[classroom.id.toString(), classroom.title]}
                    key={classroom.id}
                    value={classroom.id}
                >
                    <strong>{classroom.title}</strong>
                </SelectItem>
            ))}
        </Select>
    )
}

export default ClassroomSelect
