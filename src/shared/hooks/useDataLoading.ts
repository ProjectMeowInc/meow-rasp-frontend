import { useState } from "react"
import { useFirstLoadingAsync } from "./useFirstLoading"
import { HttpClient, SendError } from "../helpers/HttpClient"
import { HttpError } from "../helpers/errors"

export type DataLoadingState<TRes> = LoadingStateType | LoadErrorStateType | LoadSuccessStateType<TRes>

type LoadFnType<TRes> = () => Promise<TRes>

export function useDataLoading<TRes>(loadFn: LoadFnType<TRes>) {
    const [state, setState] = useState<DataLoadingState<TRes>>({
        isLoading: true,
    })

    const reload = async () => {
        setState({ isLoading: true })

        try {
            const result = await loadFn()
            setState({
                isLoading: false,
                isError: false,
                content: result,
            })
        } catch (err) {
            setState({
                isLoading: false,
                isError: true,
                error: getErrorMessage(err as Error),
            })
        }
    }

    useFirstLoadingAsync(async () => {
        await reload()
    })

    return { state, reload }
}

export function useHttpDataLoading<TRes>(req: HttpClient) {
    const [state, setState] = useState<DataLoadingState<TRes>>({
        isLoading: true,
    })

    const reload = async () => {
        setState({
            isLoading: true,
        })

        const result = await req.send<TRes>()

        if (result.hasError()) {
            return setState({
                isLoading: false,
                isError: true,
                error: getErrorMessage(result.getError()),
            })
        }

        setState({
            isLoading: false,
            isError: false,
            content: result.unwrap(),
        })
    }

    useFirstLoadingAsync(async () => {
        await reload()
    })

    return { state, reload }
}

export function useHttpDataLoadingWithMap<TReqRes, TRes>(req: HttpClient, mapFn: (val: TReqRes) => TRes) {
    const [state, setState] = useState<DataLoadingState<TRes>>({
        isLoading: true,
    })

    const reload = async () => {
        setState({
            isLoading: true,
        })

        const result = await req.send<TReqRes>()

        if (result.hasError()) {
            return setState({
                isLoading: false,
                isError: true,
                error: getErrorMessage(result.getError()),
            })
        }

        setState({
            isLoading: false,
            isError: false,
            content: mapFn(result.unwrap()),
        })
    }

    useFirstLoadingAsync(async () => {
        await reload()
    })

    return { state, reload }
}

type LoadingStateType = {
    isLoading: true
}

type LoadErrorStateType = {
    isLoading: false
    isError: true
    error: string
}

export type LoadSuccessStateType<TRes> = {
    isLoading: false
    isError: false
    content: TRes
}

export function getErrorMessage(err: SendError): string {
    if (err instanceof Error) {
        return err.message
    }

    if (err instanceof HttpError) {
        return err.message
    }

    if (typeof err === "object") {
        switch (err.type) {
            case "any":
                return err.message
            case "validationError":
                return err.errors[0].message
            case "internalServerError":
                return "Внутренняя ошибка сервера"
        }
    }

    return "unknown"
}
