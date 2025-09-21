"use client"

import EmptyItemsDisplay from "@/shared/ui/EmptyItemsDisplay/EmptyItemsDisplay"
import Header from "../components/Header/Header"
import styles from "./groupDashborad.module.css"
import EmptyResultMessage from "@/shared/ui/EmptyResultMessage/EmptyResultMessage"
import Modal from "../components/Modal/Modal"
import ModalLabel from "../components/ModalLabel/ModalLabel"
import ModalButtons from "../components/ModalButtons/ModalButtons"
import { useGroupDashboard } from "./useGroupDashboard"
import Preloader from "@/shared/ui/Preloader/Preloader"
import ErrorReloadMessage from "@/shared/ui/ErrorReloadMessage/ErrorReloadMessage"
import GroupItem from "./components/GroupItem"
import GroupDisciplineDashboard from "@/routes/dashboard/groupDiscipline/GroupDisciplineDashboard"

const GroupDashboard = () => {
    const {
        state,
        isModalOpen,
        formData,
        editingId,
        selectedGroupId,
        setFormData,
        cancelHandler,
        openUpdateHandler,
        openCreateHandler,
        deleteHandler,
        submitHandler,
        setSelectedGroupId,
    } = useGroupDashboard()

    if (state.isLoading) {
        return <Preloader />
    }

    if (state.isError) {
        return <ErrorReloadMessage />
    }

    return (
        <div className={styles.page}>
            <div className={styles.leftSide}>
                <Header
                    caption={"Управление группами"}
                    buttonCaption={"Добавить группу"}
                    onButtonClick={openCreateHandler}
                />

                <EmptyItemsDisplay items={state.content.items}>
                    <EmptyItemsDisplay.Contains>
                        <div className={styles.grid}>
                            {state.content.items.map((group) => (
                                <GroupItem
                                    key={group.id}
                                    id={group.id}
                                    title={group.title}
                                    onUpdate={openUpdateHandler}
                                    onDelete={deleteHandler}
                                    onClick={(id) => setSelectedGroupId(id)}
                                />
                            ))}
                        </div>
                    </EmptyItemsDisplay.Contains>

                    <EmptyItemsDisplay.Empty>
                        <EmptyResultMessage />
                    </EmptyItemsDisplay.Empty>
                </EmptyItemsDisplay>
            </div>

            <div className={styles.rightSide}>
                {selectedGroupId && <GroupDisciplineDashboard id={selectedGroupId} />}
            </div>

            <Modal
                title={editingId ? "Редактировать группу" : "Добавить группу"}
                isOpen={isModalOpen}
                onClose={cancelHandler}
            >
                <ModalLabel
                    label="Название группы"
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

export default GroupDashboard
