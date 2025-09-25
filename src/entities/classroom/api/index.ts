export {
    request as CreateClassroomRequest,
    type Payload as CreateClassroomPayload,
    type Response as CreateClassroomResponse,
} from "./create-classroom"
export { request as GetAllClassroomRequest, type Response as GetAllClassroomResponse } from "./get-classrooms"
export { request as UpdateClassroomRequest, type Payload as UpdateClassroomPayload } from "./update-classroom"

export interface CreateOrUpdateClassroomRequest {
    title: string
    corpusId: number
}
