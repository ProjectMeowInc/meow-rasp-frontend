import { GROUPS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"

export interface Response {
    items: {
        id: number
        title: string
        lessonsCount: number
        disciplineType: {
            type: "shared" | "devided"
            subgroup?: number
        }
        teacher: {
            id: number
            name: string
        }
    }[]
}

export const requset = (groupId: number) =>
    new HttpClient().withMethodGet().withUrl(`${GROUPS_API}${groupId}/disciplines`)
