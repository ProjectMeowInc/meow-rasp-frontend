"use client"
import DayColumn from "./ui/day-column"
import { useGroupScheduleDashboard } from "./hook"
import styles from "./styles.module.css"
import { useParams } from "next/navigation"
import Preloader from "@/shared/ui/preloader"
import { dateTimeToDateString, getDateStringsRange, getISOWeekMonday } from "@/shared/helpers/time"
import { CreateLessonModal } from "@/features/dashboard/lesson/create-lesson"

const getWeekDates = () => {
    const startDate = getISOWeekMonday()

    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + 13)
    return {
        startDate,
        endDate,
    }
}

const { startDate, endDate } = getWeekDates()
const days = getDateStringsRange(startDate, endDate)

const GroupScheduleDashboardPage = () => {
    const { id: groupId } = useParams<{ id: string }>()
    const { isModalOpen, editingSlot, openFormHandler, submitHandler, scheduleState } = useGroupScheduleDashboard(
        parseInt(groupId),
        dateTimeToDateString(startDate),
        dateTimeToDateString(endDate),
    )

    return (
        <div className={styles.page}>
            <h1 className={styles.caption}>Расписание группы</h1>
            {scheduleState.isLoading && <Preloader />}
            {!scheduleState.isLoading && scheduleState.isError && (
                <p className={styles.error}>Ошибка: {scheduleState.error}</p>
            )}
            <div className={styles.grid}>
                {!scheduleState.isLoading &&
                    !scheduleState.isError &&
                    days.map((day) => (
                        <DayColumn
                            key={day}
                            date={day}
                            onSlotCardEdit={(date, number, lessonId) => openFormHandler({ date, number }, lessonId)}
                            scheduleData={scheduleState.content.items[day] || []}
                        />
                    ))}
            </div>
            {editingSlot && (
                <CreateLessonModal
                    isOpen={isModalOpen}
                    onClose={submitHandler}
                    groupId={parseInt(groupId)}
                    date={editingSlot?.date}
                    number={editingSlot?.number}
                />
            )}
        </div>
    )
}

export default GroupScheduleDashboardPage
