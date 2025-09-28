"use client"

import Preloader from "@/shared/ui/preloader"
import styles from "./styles.module.css"
import useClassroomDashboard from "./hook"
import ErrorReloadMessage from "@/shared/ui/error-reload-message"
import EmptyItemsDisplay from "@/shared/ui/empty-item-display"
import EmptyResultMessage from "@/shared/ui/empty-result-message"
import { ClassroomItem } from "@/features/classroom/get-classrooms"
import CardActions from "@/shared/ui/card-actions"
import { CreateOrEditClassroomModal } from "@/widgets/dashboard/create-or-edit-classroom-modal"
import { DashboardHeaderLayout } from "@/shared/layout/header/dashboard"

const ClassroomDashboardPage = () => {
    const { state, editingId, isModalOpen, openCreateHandler, openUpdateHandler, closeModalHandler, deleteHandler } =
        useClassroomDashboard()

    if (state.isLoading) {
        return <Preloader />
    }

    if (state.isError) {
        return (
            <div>
                <ErrorReloadMessage />
            </div>
        )
    }

    return (
        <DashboardHeaderLayout
            caption={"Управление кабинетами"}
            buttonCaption={"Добавить кабинет"}
            onButtonClick={openCreateHandler}
        >
            <EmptyItemsDisplay items={state.content.items}>
                <EmptyItemsDisplay.Contains>
                    <div className={styles.grid}>
                        {state.content.items.map((classroom) => (
                            <ClassroomItem
                                key={classroom.id}
                                corpus={classroom.corpus}
                                title={`Кабинет ${classroom.title}`}
                                cardActions={
                                    <CardActions
                                        id={classroom.id}
                                        onUpdate={openUpdateHandler}
                                        onDelete={deleteHandler}
                                    />
                                }
                            />
                        ))}
                    </div>
                </EmptyItemsDisplay.Contains>

                <EmptyItemsDisplay.Empty>
                    <EmptyResultMessage />
                </EmptyItemsDisplay.Empty>
            </EmptyItemsDisplay>

            <CreateOrEditClassroomModal editingId={editingId} isOpen={isModalOpen} onClose={closeModalHandler} />
        </DashboardHeaderLayout>
    )
}

export default ClassroomDashboardPage
