type CloseReason = "submit" | "cancel"

interface OnCloseEvent {
    reason: CloseReason
}

export type OnCloseFn = (event: OnCloseEvent) => void
