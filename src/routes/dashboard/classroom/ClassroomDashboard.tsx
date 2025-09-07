"use client"

import Preloader from "@/shared/ui/Preloader/Preloader"
import styles from "./classroomDashboard.module.css"
import useClassroomDashboard from "./useClassroomDashboard"
import ErrorReloadMessage from "@/shared/ui/ErrorReloadMessage/ErrorReloadMessage"
import Header from "../components/Header/Header"
import EmptyItemsDisplay from "@/shared/ui/EmptyItemsDisplay/EmptyItemsDisplay"
import ClassroomItem from "./components/ClassroomItem/ClassroomItem"
import EmptyResultMessage from "@/shared/ui/EmptyResultMessage/EmptyResultMessage"
import Modal from "../components/Modal/Modal"
import ModalLabel from "../components/ModalLabel/ModalLabel"
import ModalButtons from "../components/ModalButtons/ModalButtons"
import Select from "@/shared/ui/Select/Select"
import SelectItem from "@/shared/ui/Select/SelectItem"

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
