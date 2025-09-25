import { TEACHERS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"

export interface Response {
    items: {
        id: number
        name: string
    }[]
}

export const request = () => new HttpClient().withMethodGet().withUrl(TEACHERS_API)
