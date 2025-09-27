export { request as CreateTeacherRequest, type Payload as CreateTeacherPayload } from "./create-teacher"
export { request as GetAllTeachersRequest, type Response as GetAllTeachersResponse } from "./get-all-teachers"
export { request as UpdateTeacherRequest, type Payload as UpdateTeacherPayload } from "./update-teacher"

export interface CreateOrUpdateTeacher {
    name: string
}
