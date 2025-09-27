import { GetLessonByIdRequest, GetLessonByIdResponse } from "@/entities/lesson"
import { ErrorToMessage } from "@/shared/helpers/errors"
import { Result } from "ts-result-meow"

export const useGetLessons = () => {
    const getLessonById = async (lessonId: number): Promise<Result<GetLessonByIdResponse, string>> => {
        return await GetLessonByIdRequest(lessonId)
            .send<GetLessonByIdResponse>()
            .then((r) => r.mapError(ErrorToMessage))
    }

    return {
        getLessonById,
    }
}
