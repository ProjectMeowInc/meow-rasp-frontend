import { CreateOrUpdateLessonPayload } from "@/entities/lesson"
import { ErrorToMessage } from "@/shared/helpers/errors"
import { Result } from "ts-result-meow"
import { UpdateLessonRequest } from "@/entities/lesson"

export const useUpdateLesson = () => {
    const updateLesson = async (
        lessonId: number,
        payload: CreateOrUpdateLessonPayload,
    ): Promise<Result<void, string>> => {
        return await UpdateLessonRequest(lessonId, payload)
            .send<void>()
            .then((r) => r.mapError(ErrorToMessage))
    }

    return {
        updateLesson,
    }
}
