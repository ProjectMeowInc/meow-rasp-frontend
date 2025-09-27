import { GetAllGroupsRequest, GetAllGroupsResponse } from "@/entities/group"
import { ErrorToMessage } from "@/shared/helpers/errors"
import { useHttpDataLoading } from "@/shared/hooks/useDataLoading"
import { Result } from "ts-result-meow"

export const useGetGroups = () => {
    const getAllGroups = async (): Promise<Result<GetAllGroupsResponse, string>> => {
        return await GetAllGroupsRequest()
            .send<GetAllGroupsResponse>()
            .then((r) => r.mapError(ErrorToMessage))
    }

    const useGetAllGroupsLoading = () => {
        return useHttpDataLoading<GetAllGroupsResponse>(GetAllGroupsRequest())
    }

    return {
        getAllGroups,
        useGetAllGroupsLoading,
    }
}
