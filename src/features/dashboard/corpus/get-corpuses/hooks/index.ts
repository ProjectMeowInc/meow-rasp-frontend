import { GetAllCorpusesRequest, GetAllCorpusesResponse } from "@/entities/corpus"
import { Result } from "ts-result-meow"
import { ErrorToMessage } from "@/shared/helpers/errors"
import { useHttpDataLoading } from "@/shared/hooks/useDataLoading"

export const useGetCorpuses = () => {
    const useGetAllCorpusesLoading = () => {
        return useHttpDataLoading<GetAllCorpusesResponse>(GetAllCorpusesRequest())
    }

    const getAllCorpuses = async (): Promise<Result<GetAllCorpusesResponse, string>> => {
        return await GetAllCorpusesRequest()
            .send<GetAllCorpusesResponse>()
            .then((r) => r.mapError(ErrorToMessage))
    }

    return { getAllCorpuses, useGetAllCorpusesLoading }
}
