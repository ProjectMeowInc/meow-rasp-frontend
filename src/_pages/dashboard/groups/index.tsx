"use client"

import EmptyItemsDisplay from "@/shared/ui/empty-item-display"
import styles from "./styles.module.css"
import EmptyResultMessage from "@/shared/ui/empty-result-message"
import { useGroupDashboard } from "./hook"
import Preloader from "@/shared/ui/preloader"
import ErrorReloadMessage from "@/shared/ui/error-reload-message"
import GroupDiscipline from "./ui/group-discipline"
import GroupItem from "./ui/group-item"
import { CreateOrEditGroupModal } from "@/widgets/dashboard/create-or-edit-group-modal"
import { DashboardHeaderLayout } from "@/shared/layout/header/dashboard"

const GroupDashboardPage = () => {
    const {
        state,
        isModalOpen,
        editingId,
        selectedGroup,
        openUpdateHandler,
        openCreateHandler,
        deleteHandler,
        closeModalHandler,
        setSelectedGroup,
    } = useGroupDashboard()

    if (state.isLoading) {
        return <Preloader />
    }

    if (state.isError) {
        return <ErrorReloadMessage />
    }

    return (
        <>
            <DashboardHeaderLayout
                caption={"Управление группами"}
                buttonCaption={"Добавить группу"}
                onButtonClick={openCreateHandler}
            >
                <EmptyItemsDisplay items={state.content.items}>
                    <EmptyItemsDisplay.Contains>
                        <div className={styles.grid}>
                            {state.content.items.map((group) => (
                                <GroupItem
                                    key={group.id}
                                    id={group.id}
                                    title={group.title}
                                    updatedAt={group.updatedAt}
                                    variant={group.id === selectedGroup?.id ? "selected" : "default"}
                                    onUpdate={openUpdateHandler}
                                    onDelete={deleteHandler}
                                    onClick={(id) =>
                                        setSelectedGroup({
                                            id: id,
                                            title: group.title,
                                        })
                                    }
                                />
                            ))}
                        </div>
                    </EmptyItemsDisplay.Contains>

                    <EmptyItemsDisplay.Empty>
                        <EmptyResultMessage />
                    </EmptyItemsDisplay.Empty>
                </EmptyItemsDisplay>
            </DashboardHeaderLayout>
            <div className={styles.rightSide}>
                {selectedGroup && <GroupDiscipline id={selectedGroup.id} title={selectedGroup.title} />}
            </div>

            <CreateOrEditGroupModal isOpen={isModalOpen} onClose={closeModalHandler} groupId={editingId} />
        </>
    )
}

export default GroupDashboardPage
