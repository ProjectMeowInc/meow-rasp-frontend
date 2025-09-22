import { LESSONS_API } from "../consts"
import { HttpClient } from "../helpers/HttpClient"
import { ILessonWithRelated } from "../models/responses"

export type IGetLessonByIdResposne = ILessonWithRelated

export const GetLessonByIdRequest = (lessonId: number) =>
    new HttpClient().withUrl(`${LESSONS_API}${lessonId}`).withMethodGet()
