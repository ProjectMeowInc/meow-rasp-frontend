import Button from "@/shared/ui/Button/Button"
import styles from "../../groupSchedule.module.css"
import { FC } from "react"

interface ISlotCardProps {
    slot: number
}

const SlotCard: FC<ISlotCardProps> = ({ slot }) => {
    return (
        <div className={styles.slotCard}>
            <div className={styles.slotHeader}>Пара {slot}</div>
            <div className={styles.slotBody}>
                <p className={styles.placeholder}>Нет занятий</p>
            </div>
            <div className={styles.slotActions}>
                <Button>✏ Добавить / Редактировать</Button>
            </div>
        </div>
    )
}

export default SlotCard
