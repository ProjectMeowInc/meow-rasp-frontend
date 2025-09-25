"use client"
import DayColumn from "./ui/day-column"
import { SetLessonForm } from "../../../widgets/dashboard"
import { useGroupScheduleDashboard } from "./hook"
import styles from "./styles.module.css"
import { useParams } from "next/navigation"
import Preloader from "@/shared/ui/preloader"
import { dateTimeToDateString, getDateStringsRange, getISOWeekMonday } from "@/shared/helpers/time"

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
    const {
        isFormOpen,
        editingSlot,
        editingLessonId,
        openFormHandler,
        closeFormHandler,
        submitHandler,
        scheduleState,
    } = useGroupScheduleDashboard(parseInt(groupId), dateTimeToDateString(startDate), dateTimeToDateString(endDate))

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
            {isFormOpen && editingSlot && (
                <SetLessonForm
                    onSubmit={submitHandler}
                    onCancel={closeFormHandler}
                    groupId={parseInt(groupId)}
                    lessonId={editingLessonId || undefined}
                    slot={{
                        date: editingSlot.date,
                        number: editingSlot.number,
                    }}
                />
            )}
        </div>
    )
}

export default GroupScheduleDashboardPage
