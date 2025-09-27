import { GetGroupDisciplinesRequest, GetGroupDisciplinesResponse } from "@/entities/group"
import { ErrorToMessage } from "@/shared/helpers/errors"
import { useHttpDataLoading } from "@/shared/hooks/useDataLoading"
import { Result } from "ts-result-meow"

export const useGetGroupDisciplines = () => {
    const getGroupDisciplines = async (groupId: number): Promise<Result<GetGroupDisciplinesResponse, string>> => {
        return await GetGroupDisciplinesRequest(groupId)
            .send<GetGroupDisciplinesResponse>()
            .then((r) => r.mapError(ErrorToMessage))
    }

    const useGetGroupDisciplinesLoading = (groupId: number) => {
        return useHttpDataLoading<GetGroupDisciplinesResponse>(GetGroupDisciplinesRequest(groupId))
    }

    return {
        getGroupDisciplines,
        useGetGroupDisciplinesLoading,
    }
}
