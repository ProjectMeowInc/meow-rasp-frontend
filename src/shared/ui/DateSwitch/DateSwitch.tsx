import React from "react"
import styles from "./dateSwitch.module.css"
import Image from "next/image"

const DateSwitch = () => {
    return (
        <div className={styles.date}>
            <Image className={styles.dateIcon} src={"/icons/date-icon.svg"} alt={"date icon"} width={24} height={24} />
            <p>12 - 19 Января 2025</p>
            <Image src={"/icons/date-icon.svg"} alt={"date icon"} width={24} height={24} />
        </div>
    )
}

export default DateSwitch
