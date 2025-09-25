import { LessonType } from "@/entities/lesson"
import { GROUPS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"

export interface Response {
    items: Record<
        string,
        Array<{
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
    >
}

export const request = (groupId: number, startDate: string, endDate: string) =>
    new HttpClient()
        .withMethodGet()
        .withUrl(`${GROUPS_API}${groupId}/schedule`)
        .withParam("startDate", startDate)
        .withParam("endDate", endDate)
