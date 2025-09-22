"use client"

import styles from "./setLessonForm.module.css"
import useSetLessonForm, { ISlot } from "./useSetLessonForm"
import DisciplineSelect from "../../../../../shared/ui/DisciplineSelect/DisciplineSelect"
import InlinePreloader from "@/shared/ui/InlinePreloader/InlinePreloader"
import TeacherSelect from "@/shared/ui/TeacherSelect/TeacherSelect"
import ClassroomSelect from "@/shared/ui/ClassroomSelect/ClassroomSelect"
import SubgroupSelect from "@/shared/ui/SubgroupSelect/SubgroupSelect"
import ModalWrapper from "../../../../../shared/ui/ModalWrapper/ModalWrapper"
import ErrorReloadMessage from "@/shared/ui/ErrorReloadMessage/ErrorReloadMessage"
import Button from "@/shared/ui/Button/Button"
import { LessonType } from "../../useGroupScheduleDashboard"

interface SetLessonFormProps {
    groupId: number
    slot: ISlot
    lessonId?: number
    onSubmit: (data: { disciplineId: number; teacherId: number; classroomId: number; lessonType: LessonType }) => void
    onCancel: () => void
}

const SetLessonForm = ({ slot, groupId, lessonId, onSubmit, onCancel }: SetLessonFormProps) => {
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

export default SetLessonForm
