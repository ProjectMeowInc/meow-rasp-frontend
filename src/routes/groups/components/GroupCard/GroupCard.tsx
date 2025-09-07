import React from "react"
import styles from "./groupCard.module.css"
import Link from "next/link"

interface IGroupCardProps {
    id: number
    title: string
}

const GroupCard: React.FC<IGroupCardProps> = ({ id, title }) => {
    return (
        <Link href={`/group/${id}/schedule/`} className={styles.group}>
            <p>{title}</p>
        </Link>
    )
}

export default GroupCard
