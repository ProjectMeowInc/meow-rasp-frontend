import { GetAllClassroomRequest, GetAllClassroomResponse } from "@/entities/classroom"
import { ErrorToMessage } from "@/shared/helpers/errors"
import { useHttpDataLoading } from "@/shared/hooks/useDataLoading"
import { Result } from "ts-result-meow"

export const useGetClassrooms = () => {
    const getAllClassrooms = async (): Promise<Result<GetAllClassroomResponse, string>> => {
        return await GetAllClassroomRequest()
            .send<GetAllClassroomResponse>()
            .then((r) => r.mapError(ErrorToMessage))
    }

    const useGetAllClassroomsLoading = () => {
        return useHttpDataLoading<GetAllClassroomResponse>(GetAllClassroomRequest())
    }

    return {
        getAllClassrooms,
        useGetAllClassroomsLoading,
    }
}
