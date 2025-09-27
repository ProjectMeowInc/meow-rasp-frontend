import Button from "@/shared/ui/button"
import { FC } from "react"
import styles from "./styles.module.css"
import { LessonType } from "@/entities/lesson"

interface ISlotCardProps {
    slot: number
    onEditClick: (slot: number, lessonId?: number) => void
    onDeleteClick: (lessonId: number) => void
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

const SlotCard: FC<ISlotCardProps> = ({ slot, onEditClick, onDeleteClick, lessons }) => {
    // Determine if we can add another lesson to this slot
    const canAddLesson = () => {
        if (!lessons || lessons.length === 0) {
            return true // No lessons, can add
        }

        // if setup shared lesson
        if (lessons.length === 1 && lessons[0].lessonType.type === "shared") {
            return false
        }

        // if setup 2 lessons
        if (lessons.length > 1) {
            return false
        }

        return true
    }

    const shouldShowAddButton = canAddLesson()

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
                            <div className={styles.lessonActions}>
                                <Button onClick={() => onEditClick(slot, lesson.id)}>Редактировать</Button>
                                <Button onClick={() => onDeleteClick(lesson.id)}>Удалить</Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={styles.placeholder}>Нет занятий</p>
                )}
            </div>
            {shouldShowAddButton && (
                <div className={styles.slotActions}>
                    <Button onClick={() => onEditClick(slot)}>Добавить занятие</Button>
                </div>
            )}
        </div>
    )
}

export default SlotCard
