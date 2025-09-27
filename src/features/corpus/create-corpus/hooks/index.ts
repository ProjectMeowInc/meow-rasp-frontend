import { CreateCorpusPayload, CreateCorpusRequest, CreateCorpusResponse } from "@/entities/corpus"
import { ErrorToMessage } from "@/shared/helpers/errors"
import { Result } from "ts-result-meow"

export const useCreateCorpus = () => {
    const createCorpus = async (payload: CreateCorpusPayload): Promise<Result<CreateCorpusResponse, string>> => {
        return await CreateCorpusRequest(payload)
            .send<CreateCorpusResponse>()
            .then((r) => r.mapError(ErrorToMessage))
    }

    return { createCorpus }
}
