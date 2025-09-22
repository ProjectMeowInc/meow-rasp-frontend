import styles from "./blockCentre.module.css"
import React, { PropsWithChildren } from "react"

const BlockCentre: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.centered}>{children}</div>
}

export default BlockCentre
