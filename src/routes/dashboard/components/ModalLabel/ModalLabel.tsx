import React, { ChangeEvent } from "react"
import styles from "./modalLabel.module.css"

interface IModalLabelProps {
    label: string
    type: AvailableType
    value?: string
    onChange?: (val: string) => void
    required: boolean
}

type AvailableType = "text"

const ModalLabel: React.FC<IModalLabelProps> = ({ label, type, value, onChange, required }) => {
    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.call(null, event.target.value)
    }

    return (
        <div className={styles.wrapper}>
            <label className={styles.label}>
                {label}
                <input
                    type={type}
                    value={value}
                    onChange={changeHandler}
                    required={required}
                    className={styles.input}
                />
            </label>
        </div>
    )
}

export default ModalLabel
