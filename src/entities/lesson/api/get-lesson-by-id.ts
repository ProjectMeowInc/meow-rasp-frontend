import { LESSONS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"
import { LessonType } from "../models"

export interface Response {
    id: number
    number: number
    lessonType: LessonType
    discipline: {
        id: number
        title: string
    }
    teacher: {
        id: number
        name: string
    }
    classroom: {
        id: number
        title: string
        corpus: {
            id: number
            title: string
        }
    }
}

export const request = (lessonId: number) => new HttpClient().withUrl(`${LESSONS_API}${lessonId}`).withMethodGet()
