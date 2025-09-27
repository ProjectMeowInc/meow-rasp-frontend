import { HttpClient } from "@/shared/helpers/HttpClient"
import { CORPUSES_API } from "@/shared/consts"
import { CreatedResponse } from "@/shared/models/responses"
import { CreateOrUpdateCorpusPayload } from "@/entities/corpus"

export type Payload = CreateOrUpdateCorpusPayload

export type Response = CreatedResponse

export const request = (payload: Payload) =>
    new HttpClient().withUrl(CORPUSES_API).withMethodPost().withAuthorization().withJsonBody(payload)
