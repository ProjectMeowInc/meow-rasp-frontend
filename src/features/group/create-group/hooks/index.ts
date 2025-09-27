import { CreateGroupPayload, CreateGroupRequest, CreateGroupResponse } from "@/entities/group"
import { ErrorToMessage } from "@/shared/helpers/errors"
import { Result } from "ts-result-meow"

export const useCreateGroup = () => {
    const createGroup = async (payload: CreateGroupPayload): Promise<Result<CreateGroupResponse, string>> => {
        return await CreateGroupRequest(payload)
            .send<CreateGroupResponse>()
            .then((r) => r.mapError(ErrorToMessage))
    }

    return { createGroup }
}
