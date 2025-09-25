import Input from "@/shared/ui/input"
import Button from "@/shared/ui/button"
import styles from "./styles.module.css"

export const LoginForm = () => {
    return (
        <div className={styles.form}>
            <div className={styles.left}>
                <p className={styles.caption}>СМПК</p>
            </div>
            <div className={styles.right}>
                <h1>Авторизация</h1>
                <Input placeholder={"Введите логин"} type={"text"} />
                <Input placeholder={"Ведите пароль"} type={"password"} />
                <Button>Войти</Button>
            </div>
        </div>
    )
}
