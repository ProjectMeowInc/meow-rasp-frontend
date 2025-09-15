import { DataLoadingState } from "@/shared/hooks/useDataLoading"
import { IGetGroupDisciplinesResponse } from "@/shared/requests"
import ErrorReloadMessage from "@/shared/ui/ErrorReloadMessage/ErrorReloadMessage"
import InlinePreloader from "@/shared/ui/InlinePreloader/InlinePreloader"
import Select from "@/shared/ui/Select/Select"
import SelectItem from "@/shared/ui/Select/SelectItem"
import React from "react"

interface IDisciplineSelectProps {
    disciplinesState: DataLoadingState<IGetGroupDisciplinesResponse>
}

const DisciplineSelect: React.FC<IDisciplineSelectProps> = ({ disciplinesState }) => {
    if (disciplinesState.isLoading) {
        return <InlinePreloader />
    }

    if (disciplinesState.isError) {
        return <ErrorReloadMessage />
    }

    return (
        <Select placeholder="Выберите дисциплину">
            {disciplinesState.content.items.map((discipline) => (
                <SelectItem key={discipline.id} value={discipline.id.toString()}>
                    <strong>{discipline.title}</strong>
                </SelectItem>
            ))}
        </Select>
    )
}

export default DisciplineSelect
