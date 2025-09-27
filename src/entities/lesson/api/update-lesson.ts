import { LESSONS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"
import { CreateOrUpdateLessonPayload } from "."

export type Payload = CreateOrUpdateLessonPayload

export const request = (id: number, payload: Payload) =>
    new HttpClient().withMethodPut().withUrl(`${LESSONS_API}${id}`).withJsonBody(payload)
