"use client"

import Preloader from "@/shared/ui/preloader"
import Header from "../ui/header"
import CorpusItem from "./ui/corpus-item/corpus-item"
import styles from "./styles.module.css"
import useCorpusesPage from "./hook"
import EmptyItemsDisplay from "@/shared/ui/empty-item-display"
import EmptyResultMessage from "@/shared/ui/empty-result-message"
import ErrorReloadMessage from "@/shared/ui/error-reload-message"
import Modal from "../../../shared/ui/modal"
import ModalLabel from "../../../shared/ui/modal/ui/modal-label"

const CorpusesDashboardPage = () => {
    const {
        state,
        isModalOpen,
        formData,
        setFormData,
        cancelHandler,
        openCreateHandler,
        openUpdateHandler,
        submitHandler,
        deleteHandler,
    } = useCorpusesPage()

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
            <Modal onSubmit={submitHandler} title="Добавить корпус" isOpen={isModalOpen} onClose={cancelHandler}>
                <ModalLabel
                    label="Название корпуса"
                    type="text"
                    value={formData.title}
                    required
                    onChange={(val) =>
                        setFormData((prev) => ({
                            ...prev,
                            title: val,
                        }))
                    }
                />
            </Modal>
        </div>
    )
}

export default CorpusesDashboardPage
