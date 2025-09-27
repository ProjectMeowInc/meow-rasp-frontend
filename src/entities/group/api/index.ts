export {
    request as CreateGroupRequest,
    type Response as CreateGroupResponse,
    type Payload as CreateGroupPayload,
} from "./create-group"
export {
    requset as GetGroupDisciplinesRequest,
    type Response as GetGroupDisciplinesResponse,
} from "./get-group-disciplines"
export { request as GetDateScheduleRequest, type Response as GetDateScheduleResponse } from "./get-date-schedule"
export { request as GetGroupScheduleRequest, type Response as GetGroupScheduleResponse } from "./get-group-schedule"
export { request as GetAllGroupsRequest, type Response as GetAllGroupsResponse } from "./get-groups"
export { request as UpdateGroupRequest, type Payload as UpdateGroupPayload } from "./update-group"

export interface CreateOrUpdateGroupPayload {
    title: string
}
