import { DataLoadingState } from "@/shared/hooks/useDataLoading"
import React from "react"
import { GetAllCorpusesResponse } from "../../api"
import Select, { SelectError, SelectItem, SelectPreloader } from "@/shared/ui/select"

export const CorpusSelect: React.FC<{
    corpusesState: DataLoadingState<GetAllCorpusesResponse>
    onChange?: (corpusId: number) => void
    onRetry?: () => void
}> = ({ corpusesState, onChange, onRetry }) => {
    if (corpusesState.isLoading) {
        return <SelectPreloader />
    }

    if (corpusesState.isError) {
        return <SelectError onRetry={onRetry} />
    }

    return (
        <Select onChange={(val) => onChange?.(parseInt(val))}>
            {corpusesState.content.items.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                    <div>Корпус - {c.title}</div>
                </SelectItem>
            ))}
        </Select>
    )
}
