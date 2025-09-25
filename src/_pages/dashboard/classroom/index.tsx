"use client"

import Preloader from "@/shared/ui/preloader"
import styles from "./styles.module.css"
import useClassroomDashboard from "./hook"
import ErrorReloadMessage from "@/shared/ui/error-reload-message"
import Header from "../ui/header"
import EmptyItemsDisplay from "@/shared/ui/empty-item-display"
import ClassroomItem from "./ui/classroom-item/classroom-item"
import EmptyResultMessage from "@/shared/ui/empty-result-message"
import Modal from "../ui/modal"
import ModalLabel from "../ui/modal-label"
import ModalButtons from "../ui/modal-buttons"
import Select, { SelectItem } from "@/shared/ui/select"

const ClassroomDashboard = () => {
    const {
        state,
        corpusesState,
        isModalOpen,
        formData,
        setFormData,
        cancelHandler,
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
                                id={classroom.id}
                                corpus={getCorpus(classroom.corpusId)}
                                title={`Кабинет ${classroom.title}`}
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

            <Modal title="Добавить кабинет" isOpen={isModalOpen} onClose={cancelHandler}>
                <ModalLabel
                    label="Название кабинета"
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

                <Select
                    onChange={(val) =>
                        setFormData((prev) => ({
                            ...prev,
                            corpusId: parseInt(val),
                        }))
                    }
                >
                    {corpusesState.content.items.map((c) => (
                        <SelectItem key={c.id} value={c.id.toString()}>
                            <div>Корпус - {c.title}</div>
                        </SelectItem>
                    ))}
                </Select>

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

export default ClassroomDashboard
