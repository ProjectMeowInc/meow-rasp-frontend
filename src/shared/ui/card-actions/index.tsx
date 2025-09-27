import { FC } from "react"
import styles from "./styles.module.css"

const CardActions: FC<{
    id: number
    onUpdate?: (id: number) => Promise<void> | void
    onDelete?: (id: number) => Promise<void> | void
}> = ({ id, onUpdate, onDelete }) => {
    return (
        <div className={styles.actions}>
            <button className={styles.edit} onClick={() => onUpdate?.call(null, id)}>
                ✏ Редактировать
            </button>
            <button className={styles.delete} onClick={() => onDelete?.call(null, id)}>
                🗑 Удалить
            </button>
        </div>
    )
}

export default CardActions
