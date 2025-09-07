import type { Metadata } from "next"
import "./globals.css"
import { Raleway } from "next/font/google"

export const metadata: Metadata = {
    title: "Расписание СМПК",
    description: "Узнайте обновления в учебном расписании тут",
}

const raleway = Raleway({
    preload: true,
    style: "normal",
    subsets: ["cyrillic", "latin", "cyrillic-ext", "latin-ext"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ru">
            <body className={raleway.className}>{children}</body>
        </html>
    )
}
