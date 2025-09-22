import { LessonType } from "@/routes/dashboard/groupSchedule/useGroupScheduleDashboard"

export interface ICreatedResponse {
    createdId: number
}

export type DisciplineTypePayload = "shared" | "devided"

export const AvailableDisciplineTypePayload: DisciplineTypePayload[] = ["shared", "devided"]

export interface ILessonWithRelated {
    id: number
    number: number
    lessonType: LessonType
    discipline: {
        id: number
        title: string
    }
    teacher: {
        id: number
        name: string
    }
    classroom: {
        id: number
        title: string
        corpus: {
            id: number
            title: string
        }
    }
}
