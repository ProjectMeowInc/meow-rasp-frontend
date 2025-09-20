import Button from "@/shared/ui/Button/Button"
import { FC } from "react"
import { LessonType } from "@/routes/dashboard/groupSchedule/useGroupScheduleDashboard"
import styles from "../../groupSchedule.module.css"

interface ISlotCardProps {
    slot: number
    onEditClick: (slot: number) => void
    lessons?: {
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

const SlotCard: FC<ISlotCardProps> = ({ slot, onEditClick, lessons }) => {
    return (
        <div className={styles.slotCard}>
            <div className={styles.slotHeader}>Пара {slot}</div>
            <div className={styles.slotBody}>
                {lessons && lessons.length > 0 ? (
                    lessons.map((lesson) => (
                        <div
                            key={lesson.id}
                            className={styles.lessonItem}
                            data-subgroup={lesson.lessonType.type === "devided" ? lesson.lessonType.subgroup : "shared"}
                        >
                            <p>
                                <strong>Предмет:</strong> {lesson.discipline.title}
                            </p>
                            <p>
                                <strong>Преподаватель:</strong> {lesson.teacher.name}
                            </p>
                            <p>
                                <strong>Аудитория:</strong> {lesson.classroom.title}
                            </p>
                            <p>
                                <strong>Корпус:</strong> {lesson.classroom.corpus.title}
                            </p>
                            {lesson.lessonType.type === "devided" && (
                                <p>
                                    <strong>Подгруппа:</strong> {lesson.lessonType.subgroup}
                                </p>
                            )}
                        </div>
                    ))
                ) : (
                    <p className={styles.placeholder}>Нет занятий</p>
                )}
            </div>
            <div className={styles.slotActions}>
                <Button onClick={() => onEditClick(slot)}>Редактировать</Button>
            </div>
        </div>
    )
}

export default SlotCard
