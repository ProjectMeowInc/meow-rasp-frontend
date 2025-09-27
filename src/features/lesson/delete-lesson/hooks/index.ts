import { DeleteLessonRequest } from "@/entities/lesson"
import { ErrorToMessage } from "@/shared/helpers/errors"
import { Result } from "ts-result-meow"

export const useDeleteLesson = () => {
    const deleteLesson = async (lessonId: number): Promise<Result<void, string>> => {
        return await DeleteLessonRequest(lessonId)
            .send<void>()
            .then((r) => r.mapError(ErrorToMessage))
    }

    return {
        deleteLesson,
    }
}
