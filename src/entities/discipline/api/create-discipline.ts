import { DISCIPLINE_API } from "@/shared/consts"
import { CreatedResponse } from "@/shared/models/responses"
import { DisciplineTypePayload } from "../models"
import { HttpClient } from "@/shared/helpers/HttpClient"

export type Response = CreatedResponse

export interface Payload {
    title: string
    disciplineType: DisciplineTypePayload
    lessonsCount: number
    teacherId: number
    groupId: number
}

export const request = (payload: Payload) =>
    new HttpClient().withUrl(DISCIPLINE_API).withMethodPost().withAuthorization().withJsonBody(payload)
