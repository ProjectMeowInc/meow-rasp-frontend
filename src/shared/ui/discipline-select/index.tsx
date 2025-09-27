import { GetGroupDisciplinesResponse } from "@/entities/group"
import { DataLoadingState } from "@/shared/hooks/useDataLoading"
import ErrorReloadMessage from "@/shared/ui/error-reload-message"
import InlinePreloader from "@/shared/ui/inline-preloader"
import Select, { SelectItem } from "@/shared/ui/select"
import React from "react"

const DisciplineSelect: React.FC<{
    disciplinesState: DataLoadingState<GetGroupDisciplinesResponse>
    selectedDiscipline?: number
    onChange?: (id: number) => void
}> = ({ disciplinesState, selectedDiscipline, onChange }) => {
    if (disciplinesState.isLoading) {
        return <InlinePreloader />
    }

    if (disciplinesState.isError) {
        return <ErrorReloadMessage />
    }

    return (
        <Select
            supportSearch
            placeholder="Выберите дисциплину"
            value={selectedDiscipline?.toString()}
            onChange={(val) => onChange?.(parseInt(val))}
        >
            {disciplinesState.content.items.map((discipline) => (
                <SelectItem
                    searchValue={[discipline.id.toString(), discipline.title]}
                    key={discipline.id}
                    value={discipline.id.toString()}
                >
                    <strong>{discipline.title}</strong>
                </SelectItem>
            ))}
        </Select>
    )
}

export default DisciplineSelect
