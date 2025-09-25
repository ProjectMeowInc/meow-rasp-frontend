import React from "react"
import styles from "./styles.module.css"
import CardActions from "../../../../../ui/card-actions"

interface IDisciplineItemProps {
    id: number
    title: string
    teacher: { id: number; name: string }
    onUpdate: (id: number) => void
    onDelete: (id: number) => void
}

const DisciplineItem: React.FC<IDisciplineItemProps> = ({ id, title, teacher, onUpdate, onDelete }) => {
    return (
        <div className={styles.item}>
            <div className={styles.itemHeader}>{title}</div>
            <div className={styles.itemBody}>
                <p>
                    <strong>Преподаватель:</strong> {teacher.name}
                </p>
            </div>
            <CardActions id={id} onUpdate={onUpdate} onDelete={onDelete} />
        </div>
    )
}

export default DisciplineItem
