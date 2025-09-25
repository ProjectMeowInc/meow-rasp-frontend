import { CLASSROOMS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"
import { CreateOrUpdateClassroomRequest } from "."

export type Payload = CreateOrUpdateClassroomRequest

export const request = (classroomId: number, payload: Payload) =>
    new HttpClient()
        .withUrl(`${CLASSROOMS_API}${classroomId}`)
        .withMethodPut()
        .withAuthorization()
        .withJsonBody(payload)
