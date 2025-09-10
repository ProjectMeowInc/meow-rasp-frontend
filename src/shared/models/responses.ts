export interface ICreatedResponse {
    createdId: number
}

export type DisciplineTypePayload = "shared" | "devided"

export const AvailableDisciplineTypePayload: DisciplineTypePayload[] = ["shared", "devided"]
