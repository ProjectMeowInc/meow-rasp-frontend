import type { Metadata } from "next"
import styles from "./layout.module.css"
import Menu from "@/shared/ui/menu"

export const metadata: Metadata = {
    title: "Расписание СМПК",
    description: "Узнайте обновления в учебном расписании тут",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className={styles.wrapper}>
            <Menu />
            {children}
        </div>
    )
}
