import { LessonType } from "@/routes/dashboard/groupSchedule/useGroupScheduleDashboard"
import { GROUPS_API } from "../consts"
import { HttpClient } from "../helpers/HttpClient"
import { DisciplineTypePayload } from "../models/responses"

export interface IGetGroupDisciplinesResponse {
    items: {
        id: number
        title: string
        lessonsCount: number
        disciplineType: DisciplineTypePayload
        teacher: {
            id: number
            name: string
        }
    }[]
}

export const GetAllGroupDisciplinesRequest = (groupId: number) =>
    new HttpClient().withMethodGet().withUrl(`${GROUPS_API}${groupId}/disciplines`)

export interface IGetDateScheduleWithNumberResponse {
    date: string
    number: number
    items: {
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
    }[]
}

export const GetDateScheduleWithNumber = (groupId: number, date: string, number: number) =>
    new HttpClient()
        .withMethodGet()
        // todo: add withParams()
        .withUrl(`${GROUPS_API}${groupId}/schedule/${date}?number=${number}`)

export interface IGetGroupScheduleResponse {
    items: Record<
        string,
        {
            id: number
            lessonType: LessonType
            number: number
            classroom: {
                corpus: {
                    id: number
                    title: string
                }
                id: number
                title: string
            }
            discipline: {
                id: number
                title: string
            }
            teacher: {
                id: number
                name: string
            }
        }[]
    >
}

export const GetGroupSchedule = (groupId: number, startDate: string, endDate: string) =>
    new HttpClient()
        .withMethodGet()
        // todo: withParams()
        .withUrl(`${GROUPS_API}${groupId}/schedule?start_date=${startDate}&end_date=${endDate}`)
