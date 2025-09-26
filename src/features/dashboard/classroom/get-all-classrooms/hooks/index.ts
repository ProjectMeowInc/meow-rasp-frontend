import { GetAllClassroomRequest, GetAllClassroomResponse } from "@/entities/classroom"
import { ErrorToMessage } from "@/shared/helpers/errors"
import { Result } from "ts-result-meow"

export const useGetAllClassrooms = () => {
    const getAllClassrooms = async (): Promise<Result<GetAllClassroomResponse, string>> => {
        return await GetAllClassroomRequest()
            .send<GetAllClassroomResponse>()
            .then((r) => r.mapError(ErrorToMessage))
    }

    return {
        getAllClassrooms,
    }
}
