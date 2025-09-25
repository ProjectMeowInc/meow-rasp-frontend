import { LESSONS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"
import { CreateOrUpdateLessonPayload } from "."

export type Payload = CreateOrUpdateLessonPayload

export const request = (payload: Payload) =>
    new HttpClient().withMethodPost().withUrl(LESSONS_API).withJsonBody(payload)
