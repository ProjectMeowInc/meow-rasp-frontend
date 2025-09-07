import styles from "./bothSubgroups.module.css"
import React from "react"

interface IBothSubgroupProps {
    lessons: {
        number: number
        caption: string
        teacher: string
        classroom: string
    }[]
}

const BothSubgroups: React.FC<IBothSubgroupProps> = ({ lessons }) => {
    const [firstGroup, secondGroup] = lessons

    return (
        <div className={styles.lessonCardWrapper}>
            <p className={styles.lessonCardNumber}>{firstGroup.number}</p>
            <div className={styles.lessonCard}>
                <div className={styles.lessonSubgroupCard}>
                    <p className={styles.lessonName}>{firstGroup.caption}</p>
                    <p>{firstGroup.teacher}</p>
                    <p className={styles.lessonClassroom}>{firstGroup.classroom}</p>
                </div>

                <div className={styles.lessonSubgroupCard}>
                    <p className={styles.lessonName}>{secondGroup.caption}</p>
                    <p>{secondGroup.teacher}</p>
                    <p className={styles.lessonClassroom}>{secondGroup.classroom}</p>
                </div>
            </div>
        </div>
    )
}

export default BothSubgroups
