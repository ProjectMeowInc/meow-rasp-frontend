import { TEACHERS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"
import { CreateOrUpdateTeacher } from "@/entities/teacher"

export type Payload = CreateOrUpdateTeacher

export const request = (payload: Payload) =>
    new HttpClient().withMethodPost().withUrl(TEACHERS_API).withJsonBody(payload)
