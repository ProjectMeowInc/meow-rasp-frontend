type CloseReason = "submit" | "cancel"

export interface CloseModalEvent {
    reason: CloseReason
}

export type OnCloseFn = (event: CloseModalEvent) => void
