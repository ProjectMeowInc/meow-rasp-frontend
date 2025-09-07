import styles from "./mainDashboard.module.css"
import Link from "next/link"

const sections = [
    { id: 1, name: "Преподаватели", icon: "👩‍🏫", link: "/dashboard/teachers" },
    { id: 2, name: "Кабинеты", icon: "🏫", link: "/dashboard/classrooms" },
    { id: 3, name: "Корпуса", icon: "🏢", link: "/dashboard/corpuses" },
    { id: 4, name: "Группы", icon: "👥", link: "/dashboard/groups" },
]

const MainDashboard = () => {
    return (
        <div className={styles.dashboard}>
            <main className={styles.main}>
                <h1 className={styles.title}>Панель управления</h1>
                <p className={styles.subtitle}>Выберите раздел для управления</p>

                <div className={styles.grid}>
                    {sections.map((section) => (
                        <Link href={section.link} key={section.id} className={styles.card}>
                            <div className={styles.icon}>{section.icon}</div>
                            <h2>{section.name}</h2>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default MainDashboard
