export function getISOWeekMonday(date: Date = new Date()): Date {
    // getDay return 0 for Sunday. We transform it to monday
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
    const today = new Date()
    const adjustDay = today.getDay() === 0 ? 6 : today.getDay() - 1
    const monday = new Date(today.setDate(today.getDate() - adjustDay + 1))
    monday.setHours(0, 0, 0, 0)
    return monday
}

export function getDateRange(start: Date, end: Date): Date[] {
    const dates: Date[] = []

    // Copy for immutable input params
    let current = new Date(start)
    current.setHours(0, 0, 0, 0)

    const last = new Date(end)
    last.setHours(0, 0, 0, 0)

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
