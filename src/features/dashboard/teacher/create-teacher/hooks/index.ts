import { CreateTeacherPayload, CreateTeacherRequest } from "@/entities/teacher"
import { ErrorToMessage } from "@/shared/helpers/errors"
import { Result } from "ts-result-meow"

export const useCreateTeacher = () => {
    const createTeacher = async (payload: CreateTeacherPayload): Promise<Result<void, string>> =>
        await CreateTeacherRequest(payload)
            .send<void>()
            .then((r) => r.mapError(ErrorToMessage))

    return { createTeacher }
}
