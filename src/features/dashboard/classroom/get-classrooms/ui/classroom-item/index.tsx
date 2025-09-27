import { FC, ReactNode } from "react"
import styles from "./styles.module.css"

const ClassroomItem: FC<{
    title: string
    corpus: {
        id: number
        title: string
    }
    cardActions?: ReactNode
}> = ({ title, corpus, cardActions }) => {
    return (
        <div className={styles.card}>
            <h2>{title}</h2>
            <p>
                <b>Корпус:</b> {corpus.title} (#{corpus.id})
            </p>

            {cardActions}
        </div>
    )
}

export default ClassroomItem
