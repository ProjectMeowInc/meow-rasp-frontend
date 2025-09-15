import Select from "@/shared/ui/Select/Select"
import SelectItem from "@/shared/ui/Select/SelectItem"
import React from "react"

export type SubgroupType = "both" | "first" | "second"

interface ISubgroupSelectProps {
    onChange?: (value: SubgroupType) => void
    selectedSubgroup?: SubgroupType
}

const SubgroupSelect: React.FC<ISubgroupSelectProps> = ({ onChange, selectedSubgroup }) => {
    return (
        <Select placeholder="Выберите подгруппу" value={selectedSubgroup} onChange={(val) => onChange?.(val as SubgroupType)}>
            <SelectItem value="both">Обе</SelectItem>
            <SelectItem value="first">1-я подгруппа</SelectItem>
            <SelectItem value="second">2-я подгруппа</SelectItem>
        </Select>
    )
}

export default SubgroupSelect
