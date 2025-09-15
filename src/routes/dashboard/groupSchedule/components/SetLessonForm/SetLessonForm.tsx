"use client"

import styles from "./setLessonForm.module.css"
import useSetLessonForm, { ISlot } from "./useSetLessonForm"
import DisciplineSelect from "../../../../../shared/ui/DisciplineSelect/DisciplineSelect"
import InlinePreloader from "@/shared/ui/InlinePreloader/InlinePreloader"
import TeacherSelect from "@/shared/ui/TeacherSelect/TeacherSelect"
import ClassroomSelect from "@/shared/ui/ClassroomSelect/ClassroomSelect"
import SubgroupSelect, { SubgroupType } from "@/shared/ui/SubgroupSelect/SubgroupSelect"
import ModalWrapper from "../../../../../shared/ui/ModalWrapper/ModalWrapper"
import ErrorReloadMessage from "@/shared/ui/ErrorReloadMessage/ErrorReloadMessage"
import Button from "@/shared/ui/Button/Button"

interface SetLessonFormProps {
    groupId: number
    slot: ISlot
    onSubmit: (data: { disciplineId: number; teacherId: number; classroomId: number; subgroup: SubgroupType }) => void
    onCancel: () => void
}

const SetLessonForm = ({ slot, groupId, onSubmit, onCancel }: SetLessonFormProps) => {
    const { slotState, disciplinesState, teachersState, classroomsState, handleSubmit, handleCancel } =
        useSetLessonForm({ slot, groupId, onSubmit, onCancel })

    return (
        <ModalWrapper onClose={onCancel}>
            {slotState.isLoading && <InlinePreloader size="md" />}

            {!slotState.isLoading && slotState.isError && <ErrorReloadMessage />}

            {!slotState.isLoading && !slotState.isError && (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <DisciplineSelect disciplinesState={disciplinesState} selectedDiscipline={slotState.content?.disciplineId.toString()} />
                    <TeacherSelect teachersState={teachersState} selectedTeacher={slotState.content?.teacherId.toString()} />
                    <ClassroomSelect classroomsState={classroomsState} selectedClassroom={slotState.content?.classroomId.toString()} />
                    <SubgroupSelect selectedSubgroup={slotState.content?.subgroup} />

                    <div className={styles.buttons}>
                        <Button>Сохранить</Button>
                        <Button onClick={handleCancel}>Отмена</Button>
                    </div>
                </form>
            )}
        </ModalWrapper>
    )
}

export default SetLessonForm
