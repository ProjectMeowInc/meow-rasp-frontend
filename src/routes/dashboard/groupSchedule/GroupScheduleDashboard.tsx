"use client"
import DayColumn from "./components/DayColumn/DayColumn"
import SetLessonForm from "./components/SetLessonForm/SetLessonForm"
import { useGroupScheduleDashboard } from "./useGroupScheduleDashboard"
import styles from "./groupSchedule.module.css"
import { useParams } from "next/navigation"

const getCurrentWeekDates = () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
    const monday = new Date(today.setDate(diff))

    return Array.from({ length: 6 }, (_, i) => {
        const date = new Date(monday)
        date.setDate(monday.getDate() + i)
        return date.toISOString().split("T")[0] // YYYY-MM-DD format
    })
}

const days = getCurrentWeekDates()

const GroupScheduleDashboard = () => {
    const { id: groupId } = useParams<{ id: string }>()
    const { isFormOpen, editingSlot, openFormHandler, closeFormHandler, submitHandler } = useGroupScheduleDashboard()

    return (
        <div className={styles.page}>
            <h1 className={styles.caption}>Расписание группы</h1>
            <div className={styles.grid}>
                {days.map((day) => (
                    <DayColumn
                        key={day}
                        date={day}
                        onSlotCardEdit={(date, number) => openFormHandler({ date, number })}
                    />
                ))}
            </div>
            {isFormOpen && editingSlot && (
                <SetLessonForm
                    onSubmit={submitHandler}
                    onCancel={closeFormHandler}
                    groupId={parseInt(groupId)}
                    slot={{
                        date: editingSlot.date,
                        number: editingSlot.number,
                    }}
                />
            )}
        </div>
    )
}

export default GroupScheduleDashboard
