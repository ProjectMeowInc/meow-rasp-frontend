import { UpdateGroupPayload, UpdateGroupRequest } from "@/entities/group"
import { ErrorToMessage } from "@/shared/helpers/errors"
import { Result } from "ts-result-meow"

export const useEditGroup = () => {
    const editGroup = async (groupId: number, payload: UpdateGroupPayload): Promise<Result<void, string>> => {
        return UpdateGroupRequest(groupId, payload)
            .send<void>()
            .then((r) => r.mapError(ErrorToMessage))
    }

    return {
        editGroup,
    }
}
