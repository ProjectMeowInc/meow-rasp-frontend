import styles from "./styles.module.css"

const SelectPreloader = () => {
    return (
        <div className={styles.dropdown}>
            {Array.from({ length: 1 }).map((_, idx) => (
                <div key={idx} className={styles.preloaderItem}>
                    <div className={styles.preloaderSkeleton} />
                </div>
            ))}
        </div>
    )
}

export default SelectPreloader
