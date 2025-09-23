export function getISOWeekMonday(date: Date = new Date()): Date {
    // getDay return 0 for Sunday. We transform it to monday
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
    const adjustDay = date.getDay() === 0 ? 6 : date.getDay() - 1
    const monday = new Date(date.setDate(date.getDate() - adjustDay + 1))
    monday.setHours(0, 0, 0, 0)
    return monday
}

export function getDateRange(start: Date, end: Date): Date[] {
    const dates: Date[] = []

    // Copy for immutable input params
    const current = new Date(start)
    const last = new Date(end)

    while (current <= last) {
        dates.push(new Date(current))
        current.setDate(current.getDate() + 1)
    }

    return dates
}

export function getDateStringsRange(startDate: Date, endDate: Date): string[] {
    return getDateRange(startDate, endDate).map((date) => dateTimeToDateString(date))
}

export function dateTimeToDateString(date: Date): string {
    return date.toISOString().split("T")[0]
}
export function formatDate(date: Date): string {
    date = new Date(date)
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")} ${date.getDate().toString().padStart(2, "0")}.${date.getMonth().toString().padStart(2, "0")}.${date.getFullYear()}`
}
