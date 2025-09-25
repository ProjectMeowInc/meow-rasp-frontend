"use client"

import styles from "./styles.module.css"
import useSetLessonForm, { Slot } from "./hook"
import DisciplineSelect from "../../../shared/ui/discipline-select"
import InlinePreloader from "@/shared/ui/inline-preloader"
import ClassroomSelect from "@/features/dashboard-classroom/ui/classroom-select/classroom-select"
import SubgroupSelect from "@/shared/ui/subgroup-select"
import ModalWrapper from "../../../shared/ui/modal-wrapper"
import ErrorReloadMessage from "@/shared/ui/error-reload-message"
import Button from "@/shared/ui/button"
import { TeacherSelect } from "@/features/dashboard-teacher/ui"
import { LessonType } from "@/entities/lesson"

interface SetLessonFormProps {
    groupId: number
    slot: Slot
    lessonId?: number
    onSubmit: (data: { disciplineId: number; teacherId: number; classroomId: number; lessonType: LessonType }) => void
    onCancel: () => void
}

export const SetLessonForm = ({ slot, groupId, lessonId, onSubmit, onCancel }: SetLessonFormProps) => {
    const {
        slotState,
        disciplinesState,
        teachersState,
        classroomsState,
        setDisciplineId,
        setTeacherId,
        setClassroomId,
        setLessonType,
        handleSubmit,
        handleCancel,
    } = useSetLessonForm({ slot, groupId, lessonId, onSubmit, onCancel })

    return (
        <ModalWrapper onClose={onCancel}>
            {slotState.isLoading && <InlinePreloader size="md" />}

            {!slotState.isLoading && slotState.isError && <ErrorReloadMessage />}

            {!slotState.isLoading && !slotState.isError && (
                <>
                    {slotState.content && (
                        <div className={styles.currentData}>
                            <h3>Текущие данные:</h3>
                            <p>
                                {!disciplinesState.isLoading && !disciplinesState.isError && (
                                    <>
                                        <strong>Дисциплина:</strong>{" "}
                                        {disciplinesState.content?.items.find(
                                            (d) => d.id === slotState.content?.disciplineId,
                                        )?.title || "Не выбрана"}
                                    </>
                                )}
                            </p>
                            <p>
                                {!teachersState.isLoading && !teachersState.isError && (
                                    <>
                                        <strong>Преподаватель:</strong>{" "}
                                        {teachersState.content?.items.find((t) => t.id === slotState.content?.teacherId)
                                            ?.name || "Не выбран"}
                                    </>
                                )}
                            </p>
                            <p>
                                {!classroomsState.isLoading && !classroomsState.isError && (
                                    <>
                                        <strong>Аудитория:</strong>{" "}
                                        {classroomsState.content?.items.find(
                                            (c) => c.id === slotState.content?.classroomId,
                                        )?.title || "Не выбрана"}
                                    </>
                                )}
                            </p>
                            <p>
                                <strong>Тип занятия:</strong>{" "}
                                {slotState.content.lessonType.type === "shared" && "Вся группа"}
                                {slotState.content.lessonType.type === "devided" &&
                                    `Разделенная, подгруппа: ${slotState.content.lessonType.subgroup}`}
                            </p>
                        </div>
                    )}

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <DisciplineSelect
                            disciplinesState={disciplinesState}
                            selectedDiscipline={slotState.content?.disciplineId.toString()}
                            onChange={(value) => setDisciplineId(parseInt(value))}
                        />
                        <TeacherSelect
                            teachersState={teachersState}
                            selectedTeacher={slotState.content?.teacherId.toString()}
                            onChange={(value) => setTeacherId(parseInt(value))}
                        />
                        <ClassroomSelect
                            classroomsState={classroomsState}
                            selectedClassroom={slotState.content?.classroomId.toString()}
                            onChange={(value) => setClassroomId(parseInt(value))}
                        />
                        <SubgroupSelect selectedSubgroup={slotState.content?.lessonType} onChange={setLessonType} />

                        <div className={styles.buttons}>
                            <Button>Сохранить</Button>
                            <Button onClick={handleCancel}>Отмена</Button>
                        </div>
                    </form>
                </>
            )}
        </ModalWrapper>
    )
}
