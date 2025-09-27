import { HttpClient } from "@/shared/helpers/HttpClient"
import { TEACHERS_API } from "@/shared/consts"
import { CreateOrUpdateTeacher } from "@/entities/teacher"

export type Payload = CreateOrUpdateTeacher

export const request = (id: number, payload: Payload) =>
    new HttpClient().withUrl(`${TEACHERS_API}${id}`).withMethodPut().withAuthorization().withJsonBody(payload)
