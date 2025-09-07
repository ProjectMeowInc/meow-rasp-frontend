"use client"
import DayColumn from "./components/DayColumn/DayColumn"
import styles from "./groupSchedule.module.css"

const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]

const GroupScheduleDashboard = () => {
    return (
        <div className={styles.page}>
            <h1 className={styles.caption}>WIP: Расписание группы</h1>
            <div className={styles.grid}>
                {days.map((day) => (
                    <DayColumn key={day} day={day} />
                ))}
            </div>
        </div>
    )
}

export default GroupScheduleDashboard
