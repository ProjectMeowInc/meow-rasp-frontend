import { LessonType } from "@/entities/lesson"
import Select, { SelectItem } from "@/shared/ui/select"
import React from "react"

interface ISubgroupSelectProps {
    onChange?: (value: LessonType) => void
    selectedSubgroup?: LessonType
}

const SubgroupSelect: React.FC<ISubgroupSelectProps> = ({ onChange, selectedSubgroup }) => {
    const changeHandler = (val: string) => {
        if (val.startsWith("shared")) {
            onChange?.({ type: "shared" })
        } else {
            onChange?.({ type: "devided", subgroup: parseInt(val.split("-")[1]) })
        }
    }

    return (
        <Select placeholder="Выберите подгруппу" value={lessonTypeToValue(selectedSubgroup)} onChange={changeHandler}>
            <SelectItem value={lessonTypeToValue({ type: "shared" })}>Обе</SelectItem>
            <SelectItem value={lessonTypeToValue({ type: "devided", subgroup: 1 })}>1-я подгруппа</SelectItem>
            <SelectItem value={lessonTypeToValue({ type: "devided", subgroup: 2 })}>2-я подгруппа</SelectItem>
        </Select>
    )
}

function lessonTypeToValue(lessonType?: LessonType): string {
    if (!lessonType) {
        return "shared"
    }
    switch (lessonType.type) {
        case "shared":
            return "shared"
        case "devided":
            return `devided-${lessonType.subgroup}`
    }
}

export default SubgroupSelect
