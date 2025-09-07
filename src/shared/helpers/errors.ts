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
