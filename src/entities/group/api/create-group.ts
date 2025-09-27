import { CreatedResponse } from "@/shared/models/responses"
import { CreateOrUpdateGroupPayload } from "."
import { HttpClient } from "@/shared/helpers/HttpClient"
import { GROUPS_API } from "@/shared/consts"

export type Payload = CreateOrUpdateGroupPayload

export type Response = CreatedResponse

export const request = (payload: Payload) => {
    return new HttpClient().withUrl(`${GROUPS_API}`).withMethodPost().withJsonBody(payload)
}
