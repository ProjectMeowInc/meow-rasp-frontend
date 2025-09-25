import { CLASSROOMS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"
import { CreatedResponse } from "@/shared/models/responses"

export interface Payload {
    title: string
}

export type Response = CreatedResponse

export const request = (payload: Payload) =>
    new HttpClient().withMethodPost().withUrl(CLASSROOMS_API).withJsonBody(payload)
