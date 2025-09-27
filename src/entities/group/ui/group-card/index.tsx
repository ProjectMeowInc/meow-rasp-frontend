import React from "react"
import styles from "./styles.module.css"
import Link from "next/link"

export const GroupCard: React.FC<{
    id: number
    title: string
}> = ({ id, title }) => {
    return (
        <Link href={`/group/${id}/schedule/`} className={styles.group}>
            <p>{title}</p>
        </Link>
    )
}
