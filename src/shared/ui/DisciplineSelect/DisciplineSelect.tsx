import { DataLoadingState } from "@/shared/hooks/useDataLoading"
import { IGetGroupDisciplinesResponse } from "@/shared/requests/groupRequests"
import ErrorReloadMessage from "@/shared/ui/ErrorReloadMessage/ErrorReloadMessage"
import InlinePreloader from "@/shared/ui/InlinePreloader/InlinePreloader"
import Select from "@/shared/ui/Select/Select"
import SelectItem from "@/shared/ui/Select/SelectItem"
import React from "react"

interface IDisciplineSelectProps {
    disciplinesState: DataLoadingState<IGetGroupDisciplinesResponse>
    selectedDiscipline?: string
    onChange?: (value: string) => void
}

const DisciplineSelect: React.FC<IDisciplineSelectProps> = ({ disciplinesState, selectedDiscipline, onChange }) => {
    if (disciplinesState.isLoading) {
        return <InlinePreloader />
    }

    if (disciplinesState.isError) {
        return <ErrorReloadMessage />
    }

    return (
        <Select supportSearch placeholder="Выберите дисциплину" value={selectedDiscipline} onChange={onChange}>
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
