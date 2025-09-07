import LoginForm from "@/routes/login/components/LoginForm/LoginForm"
import styles from "./login.module.css"

export const Login = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapper_left_side}>
                <div className={styles.form}>
                    <p className={styles.caption}>СМПК</p>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
