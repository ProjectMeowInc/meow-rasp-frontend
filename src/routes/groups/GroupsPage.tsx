import { GROUPS_API } from "@/shared/consts"
import styles from "./groupsPage.module.css"
import GroupCard from "@/routes/groups/components/GroupCard/GroupCard"
import EmptyItemsDisplay from "@/shared/ui/EmptyItemsDisplay/EmptyItemsDisplay"
import { HttpClient } from "@/shared/helpers/HttpClient"
import ErrorReloadMessage from "@/shared/ui/ErrorReloadMessage/ErrorReloadMessage"
import EmptyResultMessage from "@/shared/ui/EmptyResultMessage/EmptyResultMessage"

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
