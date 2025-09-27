import { LESSONS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"
import { LessonType } from "../models"

export { request as CreateLessonRequest, type Payload as CreateLessonPayload } from "./create-lesson"
export { request as GetLessonByIdRequest, type Response as GetLessonByIdResponse } from "./get-lesson-by-id"
export { request as UpdateLessonRequest, type Payload as UpdateLessonPayload } from "./update-lesson"

export const DeleteLessonRequest = (id: number) => new HttpClient().withMethodDelete().withUrl(`${LESSONS_API}${id}`)

export interface CreateOrUpdateLessonPayload {
    date: string
    number: number
    disciplineId: number
    teacherId: number
    classroomId: number
    lessonType: LessonType
}
