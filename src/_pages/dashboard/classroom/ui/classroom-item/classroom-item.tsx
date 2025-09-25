import { FC } from "react"
import styles from "./styles.module.css"
import CardActions from "../../../ui/card-actions"

interface IClassroomItemProps {
    id: number
    title: string
    corpus: {
        id: number
        title: string
    }
    onUpdate: (id: number) => Promise<void>
    onDelete: (id: number) => Promise<void>
}

const ClassroomItem: FC<IClassroomItemProps> = ({ id, title, corpus, onUpdate, onDelete }) => {
    return (
        <div className={styles.card}>
            <h2>{title}</h2>
            <p>
                <b>Корпус:</b> {corpus.title} (#{corpus.id})
            </p>
            <CardActions id={id} onUpdate={onUpdate} onDelete={onDelete} />
        </div>
    )
}

export default ClassroomItem
