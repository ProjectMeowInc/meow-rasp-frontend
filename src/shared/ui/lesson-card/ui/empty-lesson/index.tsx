import React from "react"
import styles from "./styles.module.css"

const EmptyLesson: React.FC<{
    number: number
}> = ({ number }) => {
    return (
        <div className={styles.lessonCardWrapper}>
            <p className={styles.lessonCardNumber}>{number}</p>
            <div className={styles.lessonCard}></div>
        </div>
    )
}

export default EmptyLesson
