import { CLASSROOMS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"

export interface Response {
    items: {
        id: number
        title: string
        corpus: {
            id: number
            title: string
        }
    }[]
}

export const request = () => new HttpClient().withMethodGet().withUrl(CLASSROOMS_API)
