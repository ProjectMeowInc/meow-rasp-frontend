import { FC } from "react"
import styles from "./styles.module.css"
import SlotCard from "../slot-card"
import { LessonType } from "@/entities/lesson"

interface IDayColumnProps {
    date: string
    onSlotCardEdit: (date: string, number: number, lessonId?: number) => void
    scheduleData: {
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
    }[]
}

const slots = [1, 2, 3, 4, 5, 6]

const getDayName = (dateString: string) => {
    const date = new Date(dateString)
    const dayNames = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
    return dayNames[date.getDay()]
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
    })
}

const DayColumn: FC<IDayColumnProps> = ({ date, onSlotCardEdit, scheduleData }) => {
    return (
        <div className={styles.dayColumn}>
            <h2 className={styles.dayTitle}>{getDayName(date)}</h2>
            <p className={styles.dateSubtitle}>{formatDate(date)}</p>
            {slots.map((slot) => {
                const lessons = scheduleData.filter((l) => l.number === slot)
                return (
                    <SlotCard
                        key={slot}
                        slot={slot}
                        onEditClick={(slot, lessonId) => onSlotCardEdit(date, slot, lessonId)}
                        lessons={lessons}
                    />
                )
            })}
        </div>
    )
}

export default DayColumn
