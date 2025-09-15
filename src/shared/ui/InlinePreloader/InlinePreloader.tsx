import React from "react"
import styles from "./inlinePreloader.module.css"

interface IInlinePreloaderProps {
    size?: "xs" | "sm" | "md"
}

const InlinePreloader: React.FC<IInlinePreloaderProps> = ({ size = "md" }) => {
    return <span className={`${styles.loader} ${styles[size]}`} />
}

export default InlinePreloader
