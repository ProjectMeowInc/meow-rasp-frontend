"use client"

import styles from "./setLessonForm.module.css"
import useSetLessonForm, { ISlot } from "./useSetLessonForm"
import DisciplineSelect from "../../../../../shared/ui/DisciplineSelect/DisciplineSelect"
import InlinePreloader from "@/shared/ui/InlinePreloader/InlinePreloader"
import TeacherSelect from "@/shared/ui/TeacherSelect/TeacherSelect"
import ClassroomSelect from "@/shared/ui/ClassroomSelect/ClassroomSelect"
import SubgroupSelect, { SubgroupType } from "@/shared/ui/SubgroupSelect/SubgroupSelect"
import ModalWrapper from "./ModalWrapper"
import ErrorReloadMessage from "@/shared/ui/ErrorReloadMessage/ErrorReloadMessage"

interface SetLessonFormProps {
    groupId: number,
    slot: ISlot
    onSubmit: (data: {
        disciplineId: number
        teacherId: number
        classroomId: number
        subgroup: SubgroupType
    }) => void
    onCancel: () => void
}

const SetLessonForm = ({
    slot,
    groupId,
    onSubmit,
    onCancel,
}: SetLessonFormProps) => {
    const {
        slotState,
        disciplinesState,
        teachersState,
        classroomsState,
        disciplineId,
        setDisciplineId,
        teacherId,
        setTeacherId,
        classroomId,
        setClassroomId,
        subgroup,
        setSubgroup,
        handleSubmit,
        handleCancel,
    } = useSetLessonForm({ slot, groupId, onSubmit, onCancel })

    return (
        <ModalWrapper onClose={onCancel}>

            {slotState.isLoading && (
                <InlinePreloader size="md" />
            )}

            {
                !slotState.isLoading && slotState.isError && (
                    <ErrorReloadMessage />
                )
            }

            {
                !slotState.isLoading && !slotState.isError && (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <DisciplineSelect disciplinesState={disciplinesState} />

                        <TeacherSelect teachersState={teachersState} />
                        <ClassroomSelect classroomsState={classroomsState} />
                        <SubgroupSelect />

                        <div className={styles.buttons}>
                            <button type="submit" className={styles.submit}>
                                Сохранить
                            </button>
                            <button
                                type="button"
                                className={styles.cancel}
                                onClick={handleCancel}
                            >
                                Отмена
                            </button>
                        </div>
                    </form>
                )
            }
        </ModalWrapper>
    )
}

export default SetLessonForm
