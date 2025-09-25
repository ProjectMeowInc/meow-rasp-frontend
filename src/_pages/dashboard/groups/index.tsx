"use client"

import EmptyItemsDisplay from "@/shared/ui/empty-item-display"
import Header from "../ui/header"
import styles from "./styles.module.css"
import EmptyResultMessage from "@/shared/ui/empty-result-message"
import Modal from "../../../shared/ui/modal"
import ModalLabel from "../../../shared/ui/modal/ui/modal-label"
import ModalButtons from "../../../shared/ui/modal/ui/modal-buttons"
import { useGroupDashboard } from "./hook"
import Preloader from "@/shared/ui/preloader"
import ErrorReloadMessage from "@/shared/ui/error-reload-message"
import GroupDiscipline from "./ui/group-discipline"
import GroupItem from "./ui/group-item"

const GroupDashboardPage = () => {
    const {
        state,
        isModalOpen,
        formData,
        editingId,
        selectedGroup,
        setFormData,
        cancelHandler,
        openUpdateHandler,
        openCreateHandler,
        deleteHandler,
        submitHandler,
        setSelectedGroup,
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
                                    updatedAt={group.updatedAt}
                                    variant={group.id === selectedGroup?.id ? "selected" : "default"}
                                    onUpdate={openUpdateHandler}
                                    onDelete={deleteHandler}
                                    onClick={(id) =>
                                        setSelectedGroup({
                                            id: id,
                                            title: group.title,
                                        })
                                    }
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
                {selectedGroup && <GroupDiscipline id={selectedGroup.id} title={selectedGroup.title} />}
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

export default GroupDashboardPage
