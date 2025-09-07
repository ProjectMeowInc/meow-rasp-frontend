"use client"

import React from "react"
import { FC, ReactNode, useEffect, useRef, useState } from "react"
import styles from "./select.module.css"

interface ISelectProps {
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    children: ReactNode
}

const Select: FC<ISelectProps> = ({ value, onChange, placeholder = "Выберите...", children }) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<string | undefined>(value)
    const ref = useRef<HTMLDivElement>(null)

    const handleSelect = (val: string) => {
        setSelected(val)
        onChange?.(val)
        setOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className={styles.select} ref={ref}>
            <div className={styles.trigger} onClick={() => setOpen((prev) => !prev)}>
                {selected ? (
                    React.Children.toArray(children).find(
                        // i know what i doing...
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (child: any) => child.props.value === selected,
                    )
                ) : (
                    <span style={{ color: "#9ca3af" }}>{placeholder}</span>
                )}
                <span style={{ marginLeft: "auto", fontSize: "12px", opacity: 0.7 }}>{open ? "▲" : "▼"}</span>
            </div>
            {open && (
                <div className={styles.dropdown}>
                    {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        React.Children.map(children, (child: any) =>
                            React.cloneElement(child, {
                                onClick: handleSelect,
                                selected: selected === child.props.value,
                            }),
                        )
                    }
                </div>
            )}
        </div>
    )
}

export default Select
