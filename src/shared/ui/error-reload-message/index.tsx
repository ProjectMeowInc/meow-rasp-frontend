"use client"

import Alert from "@/shared/ui/alertsss"

const ErrorReloadMessage = () => {
    return (
        <Alert variant="error">
            Что-то пошло не так. Попробуйте <button onClick={() => window.location.reload()}>перезагрузить</button>{" "}
            страницу
        </Alert>
    )
}

export default ErrorReloadMessage
