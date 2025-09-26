export { request as GetAllCorpusesRequest, type Response as GetAllCorpusesResponse } from "./get-corpuses"
export {
    request as CreateCorpusRequest,
    type Payload as CreateCorpusPayload,
    type Response as CreateCorpusResponse,
} from "./create-corpus"
export { request as UpdateCorpusRequest, type Payload as UpdateCorpusPayload } from "./update-corpus"

export interface CreateOrUpdateCorpusPayload {
    title: string
}
