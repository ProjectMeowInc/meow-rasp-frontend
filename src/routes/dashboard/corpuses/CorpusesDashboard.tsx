"use client"

import Preloader from "@/shared/ui/Preloader/Preloader"
import Header from "../components/Header/Header"
import CorpusItem from "./components/CorpusItem/CorpusItem"
import styles from "./corpusesDashboard.module.css"
import useCorpusesPage from "./useCorpusesPage"
import EmptyItemsDisplay from "@/shared/ui/EmptyItemsDisplay/EmptyItemsDisplay"
import EmptyResultMessage from "@/shared/ui/EmptyResultMessage/EmptyResultMessage"
import ErrorReloadMessage from "@/shared/ui/ErrorReloadMessage/ErrorReloadMessage"
import Modal from "../components/Modal/Modal"
import ModalLabel from "../components/ModalLabel/ModalLabel"
import ModalButtons from "../components/ModalButtons/ModalButtons"

const CorpusesPage = () => {
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
            <Modal title="Добавить корпус" isOpen={isModalOpen} onClose={cancelHandler}>
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
                <ModalButtons
                    submitVariant="success"
                    cancelVariant="danger"
                    onSubmit={submitHandler}
                    onCancel={cancelHandler}
                />
            </Modal>
        </div>
    )
}

export default CorpusesPage
