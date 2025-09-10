"use client"

import EmptyItemsDisplay from "@/shared/ui/EmptyItemsDisplay/EmptyItemsDisplay"
import Header from "../components/Header/Header"
import styles from "./groupDisciplineDashboard.module.css"
import Modal from "../components/Modal/Modal"
import ModalLabel from "../components/ModalLabel/ModalLabel"
import ModalButtons from "../components/ModalButtons/ModalButtons"
import { useParams } from "next/navigation"
import useGroupDisciplineDashboard from "./useGroupDisciplineDashboard"
import Preloader from "@/shared/ui/Preloader/Preloader"
import ErrorReloadMessage from "@/shared/ui/ErrorReloadMessage/ErrorReloadMessage"
import DisciplineItem from "./components/DisciplineItem "
import EmptyResultMessage from "@/shared/ui/EmptyResultMessage/EmptyResultMessage"

const GroupDisciplineDashboard = () => {
    const params = useParams<{ id: string }>()
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
    } = useGroupDisciplineDashboard(parseInt(params.id))

    if (state.isLoading) {
        return <Preloader />
    }

    if (state.isError) {
        return <ErrorReloadMessage />
    }

    return (
        <div className={styles.page}>
            <Header
                caption={"Управление дисциплинами группы"}
                buttonCaption={"Добавить дисциплину"}
                onButtonClick={openCreateHandler}
            />

            <EmptyItemsDisplay items={state.content.items}>
                <EmptyItemsDisplay.Contains>
                    <div className={styles.grid}>
                        {state.content.items.map((discipline) => (
                            <DisciplineItem
                                key={discipline.id}
                                id={discipline.id}
                                title={discipline.title}
                                teacher={discipline.teacher}
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

            <Modal title="Добавить дисциплину" isOpen={isModalOpen} onClose={cancelHandler}>
                <ModalLabel
                    label="Название дисциплины"
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
                <ModalLabel
                    label="Преподаватель"
                    type="text"
                    value={formData.teacher}
                    required
                    onChange={(val) =>
                        setFormData((prev) => ({
                            ...prev,
                            teacher: val,
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

export default GroupDisciplineDashboard
