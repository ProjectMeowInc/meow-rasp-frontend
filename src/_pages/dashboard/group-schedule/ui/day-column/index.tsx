import { FC } from "react"
import styles from "./styles.module.css"
import SlotCard from "../slot-card"
import { LessonType } from "@/entities/lesson"
import { formatDateString, getDayNameByDateString } from "@/shared/helpers/time"

interface LessonData {
    id: number
    lessonType: LessonType
    number: number
    classroom: {
        corpus: {
            id: number
            title: string
        }
        id: number
        title: string
    }
    discipline: {
        id: number
        title: string
    }
    teacher: {
        id: number
        name: string
    }
}

const slots = [1, 2, 3, 4, 5, 6]

const DayColumn: FC<{
    date: string
    onSlotCardEdit: (date: string, number: number, lessonId?: number) => void
    onLessonDelete: (lessonId: number) => void
    scheduleData: LessonData[]
}> = ({ date, onSlotCardEdit, onLessonDelete, scheduleData }) => {
    return (
        <div className={styles.dayColumn}>
            <h2 className={styles.dayTitle}>{getDayNameByDateString(date)}</h2>
            <p className={styles.dateSubtitle}>{formatDateString(date)}</p>
            {slots.map((slot) => {
                const lessons = scheduleData.filter((l) => l.number === slot)
                return (
                    <SlotCard
                        key={slot}
                        slot={slot}
                        onEditClick={(slot, lessonId) => onSlotCardEdit(date, slot, lessonId)}
                        onDeleteClick={onLessonDelete}
                        lessons={lessons}
                    />
                )
            })}
        </div>
    )
}

export default DayColumn
