"use client"

import Preloader from "@/shared/ui/preloader"
import Header from "../ui/header"
import CorpusItem from "./ui/corpus-item/corpus-item"
import styles from "./styles.module.css"
import useCorpusesDashboardPage from "./hook"
import EmptyItemsDisplay from "@/shared/ui/empty-item-display"
import EmptyResultMessage from "@/shared/ui/empty-result-message"
import ErrorReloadMessage from "@/shared/ui/error-reload-message"
import { CreateOrEditCorpusModal } from "@/widgets/dashboard/create-or-edit-corpus-modal"

const CorpusesDashboardPage = () => {
    const { editingId, state, isModalOpen, openCreateHandler, openUpdateHandler, submitHandler, deleteHandler } =
        useCorpusesDashboardPage()

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
        <div className={styles.page}>
            <Header
                caption={"Управление корпусами"}
                buttonCaption={"Добавить корпус"}
                onButtonClick={openCreateHandler}
            />
            <EmptyItemsDisplay items={state.content.items}>
                <EmptyItemsDisplay.Contains>
                    <div className={styles.grid}>
                        {state.content.items.map((corpus) => (
                            <CorpusItem
                                key={corpus.id}
                                id={corpus.id}
                                title={corpus.title}
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
            <CreateOrEditCorpusModal editingId={editingId} isOpen={isModalOpen} onClose={submitHandler} />
        </div>
    )
}

export default CorpusesDashboardPage
