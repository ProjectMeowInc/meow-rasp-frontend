import styles from "./fullGroup.module.css"
import React from "react"

interface IFullGroupProps {
    number: number
    caption: string
    teacher: string
    classroom: string
}

const FullGroup: React.FC<IFullGroupProps> = ({ number, teacher, classroom, caption }) => {
    return (
        <div className={styles.lessonCardWrapper}>
            <p className={styles.lessonCardNumber}>{number}</p>
            <div className={styles.lessonCard}>
                <p className={styles.lessonName}>{caption}</p>
                <p>{teacher}</p>
                <p className={styles.lessonClassroom}>{classroom}</p>
            </div>
        </div>
    )
}

export default FullGroup
