import { GetAllTeachersRequest, GetAllTeachersResponse } from "@/entities/teacher"
import { ErrorToMessage } from "@/shared/helpers/errors"
import { useHttpDataLoading } from "@/shared/hooks/useDataLoading"
import { Result } from "ts-result-meow"

export const useGetTeachers = () => {
    const getAllTeachers = async (): Promise<Result<GetAllTeachersResponse, string>> => {
        return await GetAllTeachersRequest()
            .send<GetAllTeachersResponse>()
            .then((r) => r.mapError(ErrorToMessage))
    }

    const useGetAllTeachersLoading = () => {
        return useHttpDataLoading<GetAllTeachersResponse>(GetAllTeachersRequest())
    }

    return {
        getAllTeachers,
        useGetAllTeachersLoading,
    }
}
