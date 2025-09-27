import { LessonType } from "@/entities/lesson"
import { GROUPS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"

export interface Response {
    date: string
    number: number
    items: Array<{
        id: number
        date: string
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
    }>
}

export const request = (groupId: number, date: string, number: number) =>
    new HttpClient()
        .withMethodGet()
        .withUrl(`${GROUPS_API}${groupId}/schedule/${date}`)
        .withParam("number", number.toString())
