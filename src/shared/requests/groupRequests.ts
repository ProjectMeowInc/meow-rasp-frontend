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

export const GetAllGroupDisciplinesRequest = (groupId: number) => new HttpClient()
    .withMethodGet()
    .withUrl(`${GROUPS_API}${groupId}/disciplines`)


export interface IGetDateScheduleWithNumberResponse {
    date: string,
    number: number
    items: {
        id: number,
        number: number,
        discipline: {
            id: number,
            title: string
        },
        teacher: {
            id: number,
            name: string
        }
        classroom: {
            id: number,
            title: string
            corpus: {
                id: number,
                title: string
            },
        },
    }[]
}

export const GetDateScheduleWithNumber = (groupId: number, date: string, number: number) => new HttpClient()
    .withMethodGet()
    // todo: add withParams()
    .withUrl(`${GROUPS_API}${groupId}/schedule/${date}?number=${number}`)