import { GROUPS_API } from "@/shared/consts"
import { HttpClient } from "@/shared/helpers/HttpClient"

export interface Response {
    items: {
        id: number
        title: string
        updatedAt: Date
    }[]
}

export const request = () => {
    return new HttpClient().withUrl(`${GROUPS_API}`).withMethodGet()
}
