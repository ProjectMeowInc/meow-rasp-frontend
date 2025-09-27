import { UpdateClassroomPayload, UpdateClassroomRequest } from "@/entities/classroom"
import { ErrorToMessage } from "@/shared/helpers/errors"
import { Result } from "ts-result-meow"

export const useUpdateClassroom = () => {
    const updateClassroom = async (
        classroomId: number,
        payload: UpdateClassroomPayload,
    ): Promise<Result<void, string>> => {
        return await UpdateClassroomRequest(classroomId, payload)
            .send<void>()
            .then((r) => r.mapError(ErrorToMessage))
    }

    return {
        updateClassroom,
    }
}
