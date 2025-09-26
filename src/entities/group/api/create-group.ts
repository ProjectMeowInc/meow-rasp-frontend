import { CreatedResponse } from "@/shared/models/responses"
import { CreateOrUpdateGroupPayload } from "."
import { HttpClient } from "@/shared/helpers/HttpClient"

export type Payload = CreateOrUpdateGroupPayload

export type Response = CreatedResponse

export const request = (payload: Payload) => {
    return new HttpClient().withMethodPost().withJsonBody(payload)
}
