import React from "react"
import styles from "./styles.module.css"
import CardActions from "@/shared/ui/card-actions"

interface ITeacherItemProps {
    id: number
    name: string
    onUpdate?: (id: number) => Promise<void> | void
    onDelete?: (id: number) => Promise<void> | void
}

const TeacherItem: React.FC<ITeacherItemProps> = ({ id, name, onUpdate, onDelete }) => {
    return (
        <div className={styles.card}>
            <h2>{name}</h2>
            <CardActions id={id} onUpdate={onUpdate} onDelete={onDelete} />
        </div>
    )
}

export default TeacherItem
