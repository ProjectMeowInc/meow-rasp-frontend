import React from "react"
import BothSubgroups from "./ui/both-subgroup"
import EmptyLesson from "./ui/empty-lesson"
import FirstSubgroup from "./ui/first-subgroup"
import FullGroup from "./ui/full-group"
import SecondSubgroup from "./ui/second-subgroup"

type LessonType = "FULL_GROUP" | "FIRST_SUBGROUP" | "SECOND_SUBGROUP" | "BOTH_SUBGROUP" | "NONE"

interface LessonData {
    caption: string
    teacher: string
    classroom: string
    number: number
}

const LessonCard: React.FC<{
    lessons: LessonData[]
    type: LessonType
}> = ({ lessons, type }) => {
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
