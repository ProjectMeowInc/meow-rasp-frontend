import LessonCard from "../lesson-card"
import styles from "./styles.module.css"

const DayCard = () => {
    return (
        <div className={styles.dayCard}>
            <p className={styles.date}>Понедельник 20.12.2025</p>
            {new Array(6).fill(null).map((_, i) => (
                <LessonCard
                    key={i}
                    type={"FULL_GROUP"}
                    lessons={[
                        {
                            caption: "История",
                            classroom: "2/202",
                            teacher: "Яценко Марина Васильевна",
                            number: i + 1,
                        },
                    ]}
                />
            ))}
        </div>
    )
}

export default DayCard
