import { HttpClient } from "@/shared/helpers/HttpClient"
import { CreateOrUpdateGroupPayload } from "."
import { GROUPS_API } from "@/shared/consts"

export type Payload = CreateOrUpdateGroupPayload

export const request = (groupId: number, payload: Payload) => {
    return new HttpClient().withUrl(`${GROUPS_API}${groupId}`).withMethodPut().withJsonBody(payload)
}
