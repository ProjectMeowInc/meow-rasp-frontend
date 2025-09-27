"use client"

import React from "react"
import { useUpdateLessonModal } from "./hook"
import { OnCloseFn } from "@/shared/types"
import Modal from "@/shared/ui/modal"
import ClassroomSelect from "@/shared/ui/classroom-select"
import { TeacherSelect } from "@/shared/ui/teacher-select"
import DisciplineSelect from "@/shared/ui/discipline-select"
import SubgroupSelect from "@/shared/ui/subgroup-select"
import InlinePreloader from "@/shared/ui/inline-preloader"

export const EditLessonModal: React.FC<{
    isOpen: boolean
    groupId: number
    lessonId: number
    date: string
    onClose: OnCloseFn
}> = ({ isOpen, groupId, lessonId, date, onClose }) => {
    const { formData, error, setFormData, classroomsState, disciplinesState, teachersState, submitHandler } =
        useUpdateLessonModal(groupId, lessonId, date, onClose)

    return (
        <Modal title="Изменить занятие" isOpen={isOpen} onSubmit={submitHandler} onClose={onClose}>
            {!formData && <InlinePreloader size="xs" />}
            {formData && (
                <>
                    <DisciplineSelect
                        disciplinesState={disciplinesState}
                        selectedDiscipline={formData.disciplineId}
                        onChange={(disciplineId) =>
                            setFormData((prev) => ({
                                ...prev!,
                                disciplineId,
                            }))
                        }
                    />
                    <TeacherSelect
                        teachersState={teachersState}
                        selectedTeacher={formData.teacherId}
                        onChange={(teacherId) =>
                            setFormData((prev) => ({
                                ...prev!,
                                teacherId,
                            }))
                        }
                    />
                    <ClassroomSelect
                        classroomsState={classroomsState}
                        selectedClassroom={formData.classroomId}
                        onChange={(classroomId) =>
                            setFormData((prev) => ({
                                ...prev!,
                                classroomId,
                            }))
                        }
                    />
                    <SubgroupSelect
                        selectedSubgroup={formData.lessonType}
                        onChange={(lessonType) =>
                            setFormData((prev) => ({
                                ...prev!,
                                lessonType,
                            }))
                        }
                    />
                </>
            )}
            {error && <div style={{ color: "red", marginTop: "10px" }}>Ошибка: {error}</div>}
        </Modal>
    )
}
