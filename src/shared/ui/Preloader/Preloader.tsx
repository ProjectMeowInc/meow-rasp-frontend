import Image from "next/image"
import logo from "../../../../public/logo.svg"
import styles from "./preloader.module.css"

const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <div className={styles.logoWrapper}>
                <Image src={logo} alt="СМПК" className={styles.logo} priority />
                <div className={styles.spinner}></div>
            </div>
        </div>
    )
}

export default Preloader
