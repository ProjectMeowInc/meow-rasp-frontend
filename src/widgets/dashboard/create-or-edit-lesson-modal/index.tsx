import { CreateLessonModal } from "@/features/lesson/create-lesson"
import { EditLessonModal } from "@/features/lesson/edit-lesson"
import { OnCloseFn } from "@/shared/types"
import React from "react"

export const CreateOrEditLessonModal: React.FC<{
    lessonId?: number
    number: number
    isOpen: boolean
    groupId: number
    date: string
    onClose: OnCloseFn
}> = ({ lessonId, number, isOpen, groupId, date, onClose }) => {
    if (lessonId) {
        return <EditLessonModal isOpen={isOpen} groupId={groupId} lessonId={lessonId} date={date} onClose={onClose} />
    } else {
        return <CreateLessonModal isOpen={isOpen} groupId={groupId} date={date} number={number} onClose={onClose} />
    }
}
