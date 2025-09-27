import { GetAllTeachersResponse } from "@/entities/teacher"
import { DataLoadingState } from "@/shared/hooks/useDataLoading"
import ErrorReloadMessage from "@/shared/ui/error-reload-message"
import InlinePreloader from "@/shared/ui/inline-preloader"
import Select, { SelectItem } from "@/shared/ui/select"
import React from "react"

export const TeacherSelect: React.FC<{
    teachersState: DataLoadingState<GetAllTeachersResponse>
    selectedTeacher?: number
    onChange?: (id: number) => void
}> = ({ selectedTeacher, teachersState, onChange }) => {
    if (teachersState.isLoading) {
        return <InlinePreloader />
    }

    if (teachersState.isError) {
        return <ErrorReloadMessage />
    }

    return (
        <Select
            supportSearch
            value={selectedTeacher?.toString()}
            placeholder="Выберите преподавателя"
            onChange={(val) => onChange?.(parseInt(val))}
        >
            {teachersState.content.items.map((teacher: { id: number; name: string }) => (
                <SelectItem
                    searchValue={[teacher.id.toString(), teacher.name]}
                    key={teacher.id}
                    value={teacher.id.toString()}
                >
                    <strong>{teacher.name}</strong>
                </SelectItem>
            ))}
        </Select>
    )
}
