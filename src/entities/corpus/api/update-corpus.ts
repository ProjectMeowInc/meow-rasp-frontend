import { HttpClient } from "@/shared/helpers/HttpClient"
import { CORPUSES_API } from "@/shared/consts"
import { CreateOrUpdateCorpusPayload } from "@/entities/corpus"

export type Payload = CreateOrUpdateCorpusPayload

export const request = (corpusId: number, payload: Payload) =>
    new HttpClient().withUrl(`${CORPUSES_API}${corpusId}`).withMethodPut().withAuthorization().withJsonBody(payload)
