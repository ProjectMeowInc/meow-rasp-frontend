import styles from "./styles.module.css"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const MenuItem: React.FC<{
    title: string
    icon: string
    iconAlt: string
    href: string
}> = ({ title, icon, iconAlt, href }) => {
    return (
        <Link href={href} className={styles.menuItem}>
            <Image src={icon} width={24} height={24} alt={iconAlt} />
            <p>{title}</p>
        </Link>
    )
}

export default MenuItem
