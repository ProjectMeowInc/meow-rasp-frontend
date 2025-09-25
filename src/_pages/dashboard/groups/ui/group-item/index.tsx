"use client"

import { FC } from "react"
import styles from "./styles.module.css"
import CardActions from "../../../ui/card-actions"
import { formatDate } from "@/shared/helpers/time"

interface IGroupItemProps {
    id: number
    title: string
    updatedAt: Date
    variant?: "default" | "selected"
    onUpdate: (id: number) => Promise<void>
    onDelete: (id: number) => Promise<void>
    onClick: (id: number) => void
}

const GroupItem: FC<IGroupItemProps> = ({ id, title, updatedAt, variant, onUpdate, onDelete, onClick }) => {
    return (
        <div className={`${styles.card} ${styles[variant ?? "default"]}`} onClick={() => onClick(id)}>
            <h2>
                Группа <b>{title}</b>
            </h2>

            <h2>Изменено: {formatDate(updatedAt)}</h2>

            <p className={styles.link} onClick={() => (window.location.href = `/dashboard/groups/${id}/schedule`)}>
                Изменить расписание
            </p>

            <CardActions id={id} onUpdate={onUpdate} onDelete={onDelete} />
        </div>
    )
}

export default GroupItem
