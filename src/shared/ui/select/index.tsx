"use client"

import React from "react"
import { FC, ReactNode, useEffect, useRef, useState } from "react"
import styles from "./styles.module.css"
import { SelectItem } from "./ui/select-item"
import Input from "../input"

export { SelectItem } from "./ui/select-item"
export { default as SelectPreloader } from "./ui/select-preloader"
export { default as SelectError } from "./ui/select-error"

interface ISelectProps {
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    supportSearch?: boolean
    children: ReactNode
}

const Select: FC<ISelectProps> = ({ value, onChange, placeholder = "Выберите...", supportSearch, children }) => {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<string | undefined>(value)
    const ref = useRef<HTMLDivElement>(null)
    const searchRef = useRef<HTMLInputElement>(null)
    const [filter, setFilter] = useState<string>("")
    const [displayItems, setDisplayItems] = useState<ReactNode>(children)

    useEffect(() => {
        const normalizedFilter = filter.toLowerCase().trim()
        setDisplayItems(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            React.Children.map(children, (child: any) => {
                const searchValue: string[] = child.props.searchValue ?? []
                if (searchValue.some((v) => v.toLowerCase().includes(normalizedFilter))) {
                    return child
                }
            }),
        )
        // i know what i do
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter])

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

    const clickHandler = () => {
        setOpen((prev) => !prev)
        setSelected(undefined)
        setFilter("")
    }

    useEffect(() => {
        searchRef.current?.focus()
    })

    return (
        <div className={styles.select} ref={ref}>
            <div className={styles.trigger} onClick={clickHandler}>
                {selected ? (
                    React.Children.toArray(children).find(
                        // i know what i doing...
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (child: any) => child.props.value === selected,
                    )
                ) : supportSearch ? (
                    <Input
                        ref={searchRef}
                        style={{ border: "none" }}
                        defaultValue={selected}
                        placeholder={placeholder}
                        onChange={(value: string) => setFilter(value)}
                    />
                ) : (
                    <span style={{ color: "#9ca3af" }}>{placeholder}</span>
                )}
                <span style={{ marginLeft: "auto", fontSize: "12px", opacity: 0.7 }}>{open ? "▲" : "▼"}</span>
            </div>
            {open && (
                <div className={styles.dropdown}>
                    {!React.Children.count(children) && (
                        <SelectItem value="-1">
                            <strong>Здесь ничего нет</strong>
                        </SelectItem>
                    )}
                    {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        React.Children.map(supportSearch ? displayItems : children, (child: any) => {
                            return React.cloneElement(child, {
                                onClick: handleSelect,
                                selected: selected === child.props.value,
                            })
                        })
                    }
                </div>
            )}
        </div>
    )
}

export default Select
