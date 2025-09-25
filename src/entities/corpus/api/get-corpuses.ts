import { CORPUSES_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"

export interface Response {
    items: {
        id: number
        title: string
    }[]
}

export const request = () => new HttpClient().withMethodGet().withUrl(CORPUSES_API)
