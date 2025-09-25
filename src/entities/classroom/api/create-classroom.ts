import { CLASSROOMS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"

interface IPayload {
    title: string
}

export const request = (payload: IPayload) =>
    new HttpClient().withMethodPost().withUrl(CLASSROOMS_API).withJsonBody(payload)
