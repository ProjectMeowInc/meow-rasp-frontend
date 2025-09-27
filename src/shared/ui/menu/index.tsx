import AdminView from "../admin-view"
import styles from "./styles.module.css"
import MenuItem from "@/shared/ui/menu/menu-item"

const Menu = () => {
    return (
        <div className={styles.menu}>
            <p className={styles.logo}>СМПК</p>
            <div className={styles.list}>
                <MenuItem title={"Группы"} icon={"/icons/user-group.svg"} iconAlt={"icon group"} href={"/groups"} />
                <MenuItem title={"Преподаватели"} icon={"/icons/briefcase.svg"} iconAlt={"icon teachers"} href={""} />
                <MenuItem title={"Аудитории"} icon={"/icons/book-open.svg"} iconAlt={"icon book"} href={""} />
                <AdminView>
                    <MenuItem
                        title="Панель управления"
                        icon="/icons/user-group.svg"
                        iconAlt="icon dashboard"
                        href="/dashboard"
                    />
                </AdminView>
            </div>
        </div>
    )
}

export default Menu
