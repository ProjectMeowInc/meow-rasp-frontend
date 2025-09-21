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

export const GetDateScheduleWithNumberRequest = (groupId: number, date: string, number: number) =>
    new HttpClient()
        .withMethodGet()
        .withUrl(`${GROUPS_API}${groupId}/schedule/${date}`)
        .withParam("number", number.toString())

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

export const GetGroupScheduleRequest = (groupId: number, startDate: string, endDate: string) =>
    new HttpClient()
        .withMethodGet()
        .withUrl(`${GROUPS_API}${groupId}/schedule`)
        .withParam("start_date", startDate)
        .withParam("end_date", endDate)
