"use client"

import Preloader from "@/shared/ui/preloader"
import styles from "./styles.module.css"
import useClassroomDashboard from "./hook"
import ErrorReloadMessage from "@/shared/ui/error-reload-message"
import Header from "../ui/header"
import EmptyItemsDisplay from "@/shared/ui/empty-item-display"
import EmptyResultMessage from "@/shared/ui/empty-result-message"
import { ClassroomItem } from "@/features/dashboard/classroom/get-all-classrooms"
import CardActions from "@/shared/ui/card-actions"
import { CreateOrEditClassroomModal } from "@/widgets/dashboard"

const ClassroomDashboardPage = () => {
    const {
        state,
        editingId,
        corpusesState,
        isModalOpen,
        openCreateHandler,
        openUpdateHandler,
        submitHandler,
        deleteHandler,
    } = useClassroomDashboard()

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

    if (corpusesState.isLoading) {
        return <Preloader />
    }

    if (corpusesState.isError) {
        return <ErrorReloadMessage />
    }

    const getCorpus: (id: number) => { id: number; title: string } = (id: number) => {
        const corpus = corpusesState.content.items.find((c) => c.id === id)
        if (!corpus) {
            throw new Error("Corpus not EXISTS")
        }
        return corpus
    }

    return (
        <div className={styles.page}>
            <Header
                caption={"Управление кабинетами"}
                buttonCaption={"Добавить кабинет"}
                onButtonClick={openCreateHandler}
            />

            <EmptyItemsDisplay items={state.content.items}>
                <EmptyItemsDisplay.Contains>
                    <div className={styles.grid}>
                        {state.content.items.map((classroom) => (
                            <ClassroomItem
                                key={classroom.id}
                                corpus={getCorpus(classroom.corpusId)}
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

            <CreateOrEditClassroomModal editingId={editingId} isOpen={isModalOpen} onClose={submitHandler} />
        </div>
    )
}

export default ClassroomDashboardPage
