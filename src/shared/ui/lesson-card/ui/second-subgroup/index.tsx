import styles from "./styles.module.css"
import React from "react"

const SecondSubgroup: React.FC<{
    number: number
    caption: string
    teacher: string
    classroom: string
}> = ({ number, teacher, classroom, caption }) => {
    return (
        <div className={styles.lessonCardWrapper}>
            <p className={styles.lessonCardNumber}>{number}</p>
            <div className={styles.lessonCard}>
                <div className={styles.lessonSubgroupCard}></div>

                <div className={styles.lessonSubgroupCard}>
                    <p className={styles.lessonName}>{caption}</p>
                    <p>{teacher}</p>
                    <p className={styles.lessonClassroom}>{classroom}</p>
                </div>
            </div>
        </div>
    )
}

export default SecondSubgroup
