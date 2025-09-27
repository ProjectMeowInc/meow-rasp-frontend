import { GetGroupScheduleRequest, GetGroupScheduleResponse } from "@/entities/group"
import { ErrorToMessage } from "@/shared/helpers/errors"
import { useHttpDataLoading } from "@/shared/hooks/useDataLoading"
import { Result } from "ts-result-meow"

export const useGetSchedule = () => {
    const getGroupSchedule = async (
        groupId: number,
        startDate: string,
        endDate: string,
    ): Promise<Result<GetGroupScheduleResponse, string>> => {
        return await GetGroupScheduleRequest(groupId, startDate, endDate)
            .send<GetGroupScheduleResponse>()
            .then((r) => r.mapError(ErrorToMessage))
    }

    const useGetGroupScheduleLoading = (groupId: number, startDate: string, endDate: string) => {
        return useHttpDataLoading<GetGroupScheduleResponse>(GetGroupScheduleRequest(groupId, startDate, endDate))
    }

    return {
        getGroupSchedule,
        useGetGroupScheduleLoading,
    }
}
