"use client"

import CardActions from "@/shared/ui/card-actions"
import styles from "./styles.module.css"
import { FC } from "react"

const CorpusItem: FC<{
    id: number
    title: string
    onUpdate?: (id: number) => Promise<void>
    onDelete?: () => Promise<void>
}> = ({ id, title, onUpdate, onDelete }) => {
    return (
        <div className={styles.card}>
            <h2>
                Корпус <b>{title}</b>
            </h2>
            <CardActions id={id} onUpdate={onUpdate} onDelete={onDelete} />
        </div>
    )
}

export default CorpusItem
