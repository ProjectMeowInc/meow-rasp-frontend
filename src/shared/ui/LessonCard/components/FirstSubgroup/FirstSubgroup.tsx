import styles from "./firstSubgroup.module.css"
import React from "react"

interface IFirstSubgroupProps {
    number: number
    caption: string
    teacher: string
    classroom: string
}

const FirstSubgroup: React.FC<IFirstSubgroupProps> = ({ number, teacher, classroom, caption }) => {
    return (
        <div className={styles.lessonCardWrapper}>
            <p className={styles.lessonCardNumber}>{number}</p>
            <div className={styles.lessonCard}>
                <div className={styles.lessonSubgroupCard}>
                    <p className={styles.lessonName}>{caption}</p>
                    <p>{teacher}</p>
                    <p className={styles.lessonClassroom}>{classroom}</p>
                </div>

                <div className={styles.lessonSubgroupCard}></div>
            </div>
        </div>
    )
}

export default FirstSubgroup
