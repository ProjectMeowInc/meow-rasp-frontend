import { FC } from "react"
import styles from "../../groupSchedule.module.css"
import SlotCard from "../SlotCard/SlotCard"

interface IDayColumnProps {
    date: string
    onSlotCardEdit: (date: string, number: number) => void
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

const DayColumn: FC<IDayColumnProps> = ({ date, onSlotCardEdit }) => {
    return (
        <div className={styles.dayColumn}>
            <h2 className={styles.dayTitle}>{getDayName(date)}</h2>
            <p className={styles.dateSubtitle}>{formatDate(date)}</p>
            {slots.map((slot) => (
                <SlotCard key={slot} slot={slot} onEditClick={(slot) => onSlotCardEdit(date, slot)} />
            ))}
        </div>
    )
}

export default DayColumn
