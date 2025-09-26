import { CreateClassroomPayload, CreateClassroomRequest, CreateClassroomResponse } from "@/entities/classroom"
import { ErrorToMessage } from "@/shared/helpers/errors"
import { Result } from "ts-result-meow"

export const useCreateClassroom = () => {
    const createClassroom = async (
        payload: CreateClassroomPayload,
    ): Promise<Result<CreateClassroomResponse, string>> => {
        return await CreateClassroomRequest(payload)
            .send<CreateClassroomResponse>()
            .then((r) => r.mapError(ErrorToMessage))
    }

    return {
        createClassroom,
    }
}
