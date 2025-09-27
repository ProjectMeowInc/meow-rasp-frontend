import { GROUPS_API } from "@/shared/consts"
import styles from "./styles.module.css"
import EmptyItemsDisplay from "@/shared/ui/empty-item-display"
import { HttpClient } from "@/shared/helpers/HttpClient"
import ErrorReloadMessage from "@/shared/ui/error-reload-message"
import EmptyResultMessage from "@/shared/ui/empty-result-message"
import { GroupCard } from "@/entities/group"

interface IGetGroupsResponse {
    items: {
        id: number
        title: string
    }[]
}

const result = await new HttpClient().withUrl(GROUPS_API).withMethodGet().withAuthorization().send<IGetGroupsResponse>()

const GroupsPage = () => {
    if (result.hasError()) {
        return <ErrorReloadMessage />
    }

    const groups = result.unwrap()

    return (
        <div className={styles.wrapper}>
            <p className={styles.caption}>Группы</p>
            <EmptyItemsDisplay items={groups.items}>
                <EmptyItemsDisplay.Contains>
                    <div className={styles.groups}>
                        {groups.items.map((item) => (
                            <GroupCard key={item.id} id={item.id} title={item.title} />
                        ))}
                    </div>
                </EmptyItemsDisplay.Contains>
                <EmptyItemsDisplay.Empty>
                    <EmptyResultMessage />
                </EmptyItemsDisplay.Empty>
            </EmptyItemsDisplay>
        </div>
    )
}

export default GroupsPage
