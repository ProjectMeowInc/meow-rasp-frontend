"use client"

import { FC } from "react"
import styles from "./groupItem.module.css"
import CardActions from "../../components/CardActions/CardActions"

interface IGroupItemProps {
    id: number
    title: string
    onUpdate: (id: number) => Promise<void>
    onDelete: (id: number) => Promise<void>
}

const GroupItem: FC<IGroupItemProps> = ({ id, title, onUpdate, onDelete }) => {
    return (
        <div className={styles.card}>
            <h2>
                Группа <b>{title}</b>
            </h2>
            <div onClick={() => (window.location.href = `/dashboard/groups/${id}/schedule`)}>Изменить расписание</div>
            <div onClick={() => (window.location.href = `/dashboard/groups/${id}/discipline`)}>Изменить диспиплины</div>

            <CardActions id={id} onUpdate={onUpdate} onDelete={onDelete} />
        </div>
    )
}

export default GroupItem
