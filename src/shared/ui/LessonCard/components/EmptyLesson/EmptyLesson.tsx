import React from "react"
import styles from "./emptyLesson.module.css"

interface IEmptyLessonProps {
    number: number
}

const EmptyLesson: React.FC<IEmptyLessonProps> = ({ number }) => {
    return (
        <div className={styles.lessonCardWrapper}>
            <p className={styles.lessonCardNumber}>{number}</p>
            <div className={styles.lessonCard}></div>
        </div>
    )
}

export default EmptyLesson
