import Input from "@/shared/ui/Input/Input"
import Button from "@/shared/ui/Button/Button"
import styles from "./loginForm.module.css"

const LoginForm = () => {
    return (
        <div className={styles.form}>
            <h1>Авторизация</h1>
            <Input placeholder={"Введите логин"} type={"text"} />
            <Input placeholder={"Ведите пароль"} type={"password"} />
            <Button>Войти</Button>
        </div>
    )
}

export default LoginForm
