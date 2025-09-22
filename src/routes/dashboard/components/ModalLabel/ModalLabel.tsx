import React from "react"
import styles from "./modalLabel.module.css"
import Select from "@/shared/ui/Select/Select"
import SelectItem from "@/shared/ui/Select/SelectItem"

type IModalLabelProps = {
    label: string
    value?: string | number
    onChange?: (val: string) => void
    required: boolean
} & (
    | {
          type: "text"
      }
    | {
          type: "select"
          selectItems: {
              value: string | number
              placeholder: React.ReactNode | "string"
          }[]
      }
)

const ModalLabel: React.FC<IModalLabelProps> = (props) => {
    const { label, type, value, onChange, required } = props

    if (type === "select") {
        return (
            <div className={styles.wrapper}>
                <label className={styles.label}>
                    {label}
                    <Select value={value?.toString()} onChange={(value) => onChange?.call(null, value)}>
                        {props.selectItems.map((v) => (
                            <SelectItem key={v.value} value={v.value.toString()}>
                                {v.placeholder}
                            </SelectItem>
                        ))}
                    </Select>
                </label>
            </div>
        )
    } else {
        return (
            <div className={styles.wrapper}>
                <label className={styles.label}>
                    {label}
                    <input
                        type={type}
                        value={value}
                        onChange={(ctx) => onChange?.call(null, ctx.target.value)}
                        required={required}
                        className={styles.input}
                    />
                </label>
            </div>
        )
    }
}

export default ModalLabel
