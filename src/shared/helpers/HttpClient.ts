import { Result } from "ts-result-meow"
import { AppError, HttpError } from "./errors"

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BodyType = any

export type SendError = HttpError | AppError | Error

type AuthorizationSettingsType = {
    require: boolean
}

export class HttpClient {
    private url: string = ""
    private headers: Record<string, string> = {}
    private method: HttpMethod = "GET"
    private body: BodyType = null
    private params: Record<string, string> = {}

    private authorizationSettings: AuthorizationSettingsType = { require: false }

    withUrl(url: string): this {
        this.url = url
        return this
    }

    withParam(key: string, value: string): this {
        this.params[key] = value
        return this
    }

    withMethodGet(): this {
        this.method = "GET"
        return this
    }

    withMethodPost(): this {
        this.method = "POST"
        return this
    }

    withMethodPut(): this {
        this.method = "PUT"
        return this
    }

    withMethodDelete(): this {
        this.method = "DELETE"
        return this
    }

    setHeader(key: string, value: string): this {
        this.headers[key] = value
        return this
    }

    withAuthorization(): this {
        this.authorizationSettings = {
            require: true,
        }
        return this
    }

    withJsonBody(body: object): this {
        this.body = JSON.stringify(body)
        this.setHeader("Content-Type", "application/json")
        return this
    }

    public async send<T>(): Promise<Result<T, HttpError | AppError | Error>> {
        try {
            if (Object.keys(this.params).length !== 0) {
                this.url.concat("?")

                for (const [key, value] of Object.entries(this.params)) {
                    this.url.concat(`${key}=${value}&`)
                }
            }

            const response = await fetch(this.url, {
                method: this.method,
                headers: this.headers,
                body: this.body,
            })

            if (response.ok) {
                const contentType = response.headers.get("content-type")
                if (contentType && contentType.includes("application/json")) {
                    const data = await response.json()
                    return Result.withOk(data)
                }

                const text = await response.text()
                return Result.withOk(text as unknown as T)
            } else {
                const contentType = response.headers.get("content-type")
                if (contentType && contentType.includes("application/json")) {
                    const appErrorTypes = ["any", "validationError", "internalServerError"]
                    const errorData = await response.json().catch(() => null)
                    if (errorData && appErrorTypes.includes(errorData?.type ?? "")) {
                        return Result.withError<T, AppError>(errorData)
                    }
                }
                return Result.withError<T, HttpError>(new HttpError(response.status, response.statusText))
            }
        } catch (err) {
            return Result.withError<T, Error>(err as Error)
        }
    }
}
