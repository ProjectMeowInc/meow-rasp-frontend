import { CreateLessonPayload, CreateLessonRequest } from "@/entities/lesson"
import { ErrorToMessage } from "@/shared/helpers/errors"
import { Result } from "ts-result-meow"
import { CreatedResponse } from "@/shared/models/responses"

export const useCreateLesson = () => {
    const createLesson = async (payload: CreateLessonPayload): Promise<Result<CreatedResponse, string>> => {
        return await CreateLessonRequest(payload)
            .send<CreatedResponse>()
            .then((r) => r.mapError(ErrorToMessage))
    }

    return {
        createLesson,
    }
}
