import React from "react"
import styles from "./styles.module.css"

type InlinePreloaderSize = "xs" | "sm" | "md" | "lg"

const InlinePreloader: React.FC<{
    size?: InlinePreloaderSize
}> = ({ size = "md" }) => {
    return <span className={`${styles.loader} ${styles[size]}`} />
}

export default InlinePreloader
