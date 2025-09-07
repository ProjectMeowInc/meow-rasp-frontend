"use client"

import TeacherItem from "./components/TeacherItem/TeacherItem"
import styles from "./teacherDashboard.module.css"
import Preloader from "@/shared/ui/Preloader/Preloader"
import Header from "../components/Header/Header"
import EmptyItemsDisplay from "@/shared/ui/EmptyItemsDisplay/EmptyItemsDisplay"
import Modal from "../components/Modal/Modal"
import ModalLabel from "../components/ModalLabel/ModalLabel"
import ModalButtons from "../components/ModalButtons/ModalButtons"
import useTeacherDashboard from "./useTeacherDashboard"
import EmptyResultMessage from "@/shared/ui/EmptyResultMessage/EmptyResultMessage"
import ErrorReloadMessage from "@/shared/ui/ErrorReloadMessage/ErrorReloadMessage"

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
            <Modal title="Добавить преподавателя" isOpen={isModalOpen} onClose={cancelHandler}>
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

export default TeacherDashboard
