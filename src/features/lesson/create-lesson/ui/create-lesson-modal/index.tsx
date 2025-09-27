"use client"

import Modal from "@/shared/ui/modal"
import { useCreateLessonModal } from "./hook"
import DisciplineSelect from "@/shared/ui/discipline-select"
import ClassroomSelect from "@/shared/ui/classroom-select"
import SubgroupSelect from "@/shared/ui/subgroup-select"
import { OnCloseFn } from "@/shared/types"
import { TeacherSelect } from "@/shared/ui/teacher-select"

export const CreateLessonModal: React.FC<{
    groupId: number
    date: string
    number: number
    isOpen: boolean
    onClose: OnCloseFn
}> = ({ groupId, date, number, isOpen, onClose }) => {
    const { formData, error, disciplinesState, teachersState, classroomsState, setFormData, submitHandler } =
        useCreateLessonModal(groupId, date, number, onClose)

    return (
        <Modal title="Добавить занятие" isOpen={isOpen} onSubmit={submitHandler} onClose={onClose}>
            <DisciplineSelect
                disciplinesState={disciplinesState}
                selectedDiscipline={formData.disciplineId}
                onChange={(disciplineId) =>
                    setFormData((prev) => ({
                        ...prev,
                        disciplineId,
                    }))
                }
            />
            <TeacherSelect
                teachersState={teachersState}
                selectedTeacher={formData.teacherId}
                onChange={(teacherId) =>
                    setFormData((prev) => ({
                        ...prev,
                        teacherId,
                    }))
                }
            />
            <ClassroomSelect
                classroomsState={classroomsState}
                selectedClassroom={formData.classroomId}
                onChange={(classroomId) =>
                    setFormData((prev) => ({
                        ...prev,
                        classroomId,
                    }))
                }
            />
            <SubgroupSelect
                selectedSubgroup={formData.lessonType}
                onChange={(lessonType) =>
                    setFormData((prev) => ({
                        ...prev,
                        lessonType,
                    }))
                }
            />

            {error && <div style={{ color: "red", marginTop: "10px" }}>Ошибка: {error}</div>}
        </Modal>
    )
}
