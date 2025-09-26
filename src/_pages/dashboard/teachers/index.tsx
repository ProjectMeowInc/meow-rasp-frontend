"use client"

import TeacherItem from "./components/teacher-item"
import styles from "./styles.module.css"
import Preloader from "@/shared/ui/preloader"
import Header from "../ui/header"
import EmptyItemsDisplay from "@/shared/ui/empty-item-display"
import Modal from "../../../shared/ui/modal"
import ModalLabel from "../../../shared/ui/modal/ui/modal-label"
import useTeacherDashboard from "./hook"
import EmptyResultMessage from "@/shared/ui/empty-result-message"
import ErrorReloadMessage from "@/shared/ui/error-reload-message"

const TeacherDashboard = () => {
    const {
        isModalOpen,
        openCreateTeacherHandler,
        openUpdateTeacherHandler,
        formData,
        setFormData,
        state,
        submitHandler,
        cancelHandler,
        deleteTeacherHandler,
    } = useTeacherDashboard()

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
                    onButtonClick={openCreateTeacherHandler}
                />
                <EmptyItemsDisplay items={state.content.items}>
                    <EmptyItemsDisplay.Contains>
                        <div className={styles.cards}>
                            {state.content.items.map((teacher) => (
                                <TeacherItem
                                    key={teacher.id}
                                    id={teacher.id}
                                    name={teacher.name}
                                    onUpdate={openUpdateTeacherHandler}
                                    onDelete={deleteTeacherHandler}
                                />
                            ))}
                        </div>
                    </EmptyItemsDisplay.Contains>
                    <EmptyItemsDisplay.Empty>
                        <EmptyResultMessage />
                    </EmptyItemsDisplay.Empty>
                </EmptyItemsDisplay>
            </main>
            <Modal title="Добавить преподавателя" isOpen={isModalOpen} onSubmit={submitHandler} onClose={cancelHandler}>
                <ModalLabel
                    label={"ФИО преподавателя"}
                    type={"text"}
                    value={formData.name}
                    required
                    onChange={(val) =>
                        setFormData((prev) => ({
                            ...prev,
                            name: val,
                        }))
                    }
                />
            </Modal>
        </div>
    )
}

export default TeacherDashboard
