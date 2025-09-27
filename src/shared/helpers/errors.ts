export const AppErrorTypes = ["any", "validationError", "internalServerError"]

export type AppError =
    | {
          type: "any"
          message: string
      }
    | {
          type: "validationError"
          errors: {
              field: string
              message: string
          }[]
      }
    | {
          type: "internalServerError"
      }

export class HttpError extends Error {
    status: number

    constructor(status: number, message: string) {
        super(message)
        this.name = "HttpError"
        this.status = status
    }
}

export function ErrorToMessage(err: HttpError | AppError | Error): string {
    if (err instanceof HttpError) {
        return `${err.status}: ${err.message}`
    }

    if ("type" in err) {
        const appError = err as AppError
        switch (appError.type) {
            case "any":
                return appError.message
            case "validationError":
                return appError.errors.map((e) => `${e.field}: ${e.message}`).join(", ")
            case "internalServerError":
                return "Внутренняя ошибка сервера"
            default:
                return "Неизвестная ошибка"
        }
    }

    return err.message || "Неизвестная ошибка"
}
