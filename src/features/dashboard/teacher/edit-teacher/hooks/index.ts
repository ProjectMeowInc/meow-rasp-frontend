import { UpdateTeacherPayload, UpdateTeacherRequest } from "@/entities/teacher"
import { ErrorToMessage } from "@/shared/helpers/errors"
import { Result } from "ts-result-meow"

export const useEditTeacher = () => {
    const editTeacher = async (id: number, payload: UpdateTeacherPayload): Promise<Result<void, string>> =>
        await UpdateTeacherRequest(id, payload)
            .send<void>()
            .then((r) => r.mapError(ErrorToMessage))

    return { editTeacher }
}
