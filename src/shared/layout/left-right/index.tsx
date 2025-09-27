import React, { ReactNode } from "react"
import styles from "./styles.module.css"

export const LeftRightLayout: React.FC<{
    leftColor: string
    rightColor: string
    content: ReactNode
}> = ({ leftColor, rightColor, content }) => {
    return (
        <div className={styles.container}>
            <div className={styles.left} style={{ backgroundColor: leftColor }}></div>

            <div className={styles.right} style={{ backgroundColor: rightColor }}></div>

            <div className={styles.content}>{content}</div>
        </div>
    )
}
