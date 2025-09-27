import { UpdateCorpusPayload, UpdateCorpusRequest } from "@/entities/corpus"
import { ErrorToMessage } from "@/shared/helpers/errors"
import { Result } from "ts-result-meow"

export const useEditCorpus = () => {
    const editCorpus = async (corpusId: number, payload: UpdateCorpusPayload): Promise<Result<void, string>> => {
        return await UpdateCorpusRequest(corpusId, payload)
            .send<void>()
            .then((r) => r.mapError(ErrorToMessage))
    }

    return { editCorpus }
}
