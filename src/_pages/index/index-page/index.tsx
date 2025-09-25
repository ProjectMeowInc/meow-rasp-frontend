"use client"

import styles from "./styles.module.css"
import DayCard from "@/shared/ui/day-card"
import React, { useRef, useState } from "react"
import DateSwitch from "@/shared/ui/date-switch"

const MainPage = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [startX, setStartX] = useState<number>(0)
    const [scrollLeft, setScrollLeft] = useState<number>(0)

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!scrollRef.current) return
        setIsDragging(true)
        setStartX(e.pageX - scrollRef.current.offsetLeft)
        setScrollLeft(scrollRef.current.scrollLeft)
    }

    const handleMouseLeave = () => {
        setIsDragging(false)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !scrollRef.current) return
        e.preventDefault()
        const x = e.pageX - scrollRef.current.offsetLeft
        const walk = x - startX
        scrollRef.current.scrollLeft = scrollLeft - walk
    }

    return (
        <div className={styles.wrapper}>
            <DateSwitch />
            <div
                className={styles.schedule}
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {new Array(6).fill(0).map((_, i) => (
                    <DayCard key={i} />
                ))}
            </div>
        </div>
    )
}

export default MainPage
