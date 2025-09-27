"use client"

import TeacherItem from "./components/teacher-item"
import styles from "./styles.module.css"
import Preloader from "@/shared/ui/preloader"
import Header from "../ui/header"
import EmptyItemsDisplay from "@/shared/ui/empty-item-display"
import useTeacherDashboard from "./hook"
import EmptyResultMessage from "@/shared/ui/empty-result-message"
import ErrorReloadMessage from "@/shared/ui/error-reload-message"
import { CreateOrEditTeacherModal } from "@/widgets/dashboard/create-or-edit-teacher-modal"

const TeacherDashboard = () => {
    const { state, editingId, isModalOpen, openCreateHandler, openUpdateHandler, submitHandler, deleteHandler } =
        useTeacherDashboard()

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
        <div className={styles.dashboard}>
            <main className={styles.main}>
                <Header
                    caption="Управление преподавателями"
                    buttonCaption="Добавить преподавателя"
                    onButtonClick={openCreateHandler}
                />
                <EmptyItemsDisplay items={state.content.items}>
                    <EmptyItemsDisplay.Contains>
                        <div className={styles.cards}>
                            {state.content.items.map((teacher) => (
                                <TeacherItem
                                    key={teacher.id}
                                    id={teacher.id}
                                    name={teacher.name}
                                    onUpdate={openUpdateHandler}
                                    onDelete={deleteHandler}
                                />
                            ))}
                        </div>
                    </EmptyItemsDisplay.Contains>
                    <EmptyItemsDisplay.Empty>
                        <EmptyResultMessage />
                    </EmptyItemsDisplay.Empty>
                </EmptyItemsDisplay>
            </main>
            <CreateOrEditTeacherModal teacherId={editingId} isOpen={isModalOpen} onClose={submitHandler} />
        </div>
    )
}

export default TeacherDashboard
