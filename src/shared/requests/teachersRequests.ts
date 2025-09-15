import { TEACHERS_API } from "../consts"
import { HttpClient } from "../helpers/HttpClient"

export interface IGetTeachersResponse {
    items: {
        id: number
        name: string
    }[]
}

export const GetAllTeachersRequest = new HttpClient().withMethodGet().withUrl(TEACHERS_API)
