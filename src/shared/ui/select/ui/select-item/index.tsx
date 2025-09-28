"use client"

import { FC, ReactNode } from "react"
import styles from "./styles.module.css"

interface ISelectItemProps {
    searchValue?: string[]
    value: string | number
    children: ReactNode
    onClick?: (val: string) => void
    selected?: boolean
}

export type SelectItemType = FC<ISelectItemProps>

export const SelectItem: SelectItemType = ({ value, children, onClick, selected }) => {
    return (
        <div
            className={`${styles.item} ${selected ? styles.selected : ""}`}
            onClick={() => onClick?.call(null, value?.toString())}
        >
            {children}
        </div>
    )
}
