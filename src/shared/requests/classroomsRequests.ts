import { CLASSROOMS_API } from "../consts"
import { HttpClient } from "../helpers/HttpClient"

export interface IGetClassroomsResponse {
    items: {
        id: number
        title: string
        corpusId: number
    }[]
}

export const GetAllClassroomsRequest = new HttpClient().withMethodGet().withUrl(CLASSROOMS_API)
