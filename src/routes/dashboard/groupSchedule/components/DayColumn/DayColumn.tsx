import { FC } from "react"
import styles from "../../groupSchedule.module.css"
import SlotCard from "../SlotCard/SlotCard"

interface IDayColumnProps {
    day: string
}

const slots = [1, 2, 3, 4, 5, 6]

const DayColumn: FC<IDayColumnProps> = ({ day }) => {
    return (
        <div className={styles.dayColumn}>
            <h2 className={styles.dayTitle}>{day}</h2>
            {slots.map((slot) => (
                <SlotCard key={slot} slot={slot} />
            ))}
        </div>
    )
}

export default DayColumn
