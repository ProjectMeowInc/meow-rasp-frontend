import { FC } from "react"
import styles from "./styles.module.css"

interface IModalButtonsProps {
    submitVariant: AvailableVariant
    cancelVariant: AvailableVariant
    onSubmit?: () => Promise<void> | void
    onCancel?: () => Promise<void> | void
}

type AvailableVariant = "default" | "danger" | "primary" | "success"

const ModalButtons: FC<IModalButtonsProps> = ({ submitVariant, cancelVariant, onSubmit, onCancel }) => {
    const submitHandler = () => {
        onSubmit?.call(null)
    }

    const cancelHandler = () => {
        onCancel?.call(null)
    }

    return (
        <div className={styles.wrapper}>
            <button onClick={submitHandler} className={`${styles.button} ${styles[submitVariant]}`}>
                <span className={styles.icon}>💾</span>
                Сохранить
            </button>
            <button onClick={cancelHandler} className={`${styles.button} ${styles[cancelVariant]}`}>
                <span className={styles.icon}>❌</span>
                Удалить
            </button>
        </div>
    )
}

export default ModalButtons
