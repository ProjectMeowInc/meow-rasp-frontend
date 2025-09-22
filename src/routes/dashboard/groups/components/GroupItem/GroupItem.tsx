"use client"

import { FC } from "react"
import styles from "./groupItem.module.css"
import CardActions from "../../../components/CardActions/CardActions"

interface IGroupItemProps {
    id: number
    title: string
    variant?: "default" | "selected"
    onUpdate: (id: number) => Promise<void>
    onDelete: (id: number) => Promise<void>
    onClick: (id: number) => void
}

const GroupItem: FC<IGroupItemProps> = ({ id, title, variant, onUpdate, onDelete, onClick }) => {
    return (
        <div className={`${styles.card} ${styles[variant ?? "default"]}`} onClick={() => onClick(id)}>
            <h2>
                Группа <b>{title}</b>
            </h2>
            <p onClick={() => (window.location.href = `/dashboard/groups/${id}/schedule`)}>Изменить расписание</p>

            <CardActions id={id} onUpdate={onUpdate} onDelete={onDelete} />
        </div>
    )
}

export default GroupItem
