import React, { ReactNode } from "react"
import styles from "./styles.module.css"

export const HeaderLayout: React.FC<{
    header: ReactNode
    children: ReactNode
}> = ({ header, children }) => {
    return (
        <div className={styles.wrapper}>
            {header}
            {children}
        </div>
    )
}
