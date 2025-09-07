"use client"

import { FC, ReactNode } from "react"
import styles from "./selectItem.module.css"

interface ISelectItemProps {
    value: string
    children: ReactNode
    onClick?: (val: string) => void
    selected?: boolean
}

export type SelectItemType = FC<ISelectItemProps>

const SelectItem: SelectItemType = ({ value, children, onClick, selected }) => {
    return (
        <div className={`${styles.item} ${selected ? styles.selected : ""}`} onClick={() => onClick?.call(null, value)}>
            {children}
        </div>
    )
}

export default SelectItem
