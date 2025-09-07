import FullGroup from "@/shared/ui/LessonCard/components/FullGroup/FullGroup"
import FirstSubgroup from "@/shared/ui/LessonCard/components/FirstSubgroup/FirstSubgroup"
import SecondSubgroup from "@/shared/ui/LessonCard/components/SecondSubgroup/SecondSubgroup"
import BothSubgroups from "@/shared/ui/LessonCard/components/BothSubgroups/BothSubgroups"
import EmptyLesson from "@/shared/ui/LessonCard/components/EmptyLesson/EmptyLesson"
import React from "react"

type LessonType = "FULL_GROUP" | "FIRST_SUBGROUP" | "SECOND_SUBGROUP" | "BOTH_SUBGROUP" | "NONE"

interface ILessonCardProps {
    lessons: {
        caption: string
        teacher: string
        classroom: string
        number: number
    }[]
    type: LessonType
}

const LessonCard: React.FC<ILessonCardProps> = ({ lessons, type }) => {
    const [lesson] = lessons

    switch (type) {
        case "FULL_GROUP":
            return (
                <FullGroup
                    number={lesson.number}
                    teacher={lesson.teacher}
                    caption={lesson.caption}
                    classroom={lesson.classroom}
                />
            )
        case "FIRST_SUBGROUP":
            return (
                <FirstSubgroup
                    number={lesson.number}
                    teacher={lesson.teacher}
                    caption={lesson.caption}
                    classroom={lesson.classroom}
                />
            )
        case "SECOND_SUBGROUP":
            return (
                <SecondSubgroup
                    number={lesson.number}
                    teacher={lesson.teacher}
                    caption={lesson.caption}
                    classroom={lesson.classroom}
                />
            )
        case "BOTH_SUBGROUP":
            return <BothSubgroups lessons={lessons} />
        case "NONE":
            return <EmptyLesson number={lesson.number} />
        default:
            return <EmptyLesson number={lesson.number} />
    }
}

export default LessonCard
