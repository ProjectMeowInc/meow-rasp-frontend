import { FC } from "react"
import styles from "./styles.module.css"

interface ICardActionsProps {
    id: number
    onUpdate?: (id: number) => Promise<void> | void
    onDelete?: (id: number) => Promise<void> | void
}

const CardActions: FC<ICardActionsProps> = ({ id, onUpdate, onDelete }) => {
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
