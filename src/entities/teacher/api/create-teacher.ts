import { TEACHERS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"

export interface Payload {
    name: string
}

export const request = (payload: Payload) =>
    new HttpClient().withMethodPost().withUrl(TEACHERS_API).withJsonBody(payload)
