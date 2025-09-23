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
import GroupItem from "./components/GroupItem/GroupItem"
import GroupDiscipline from "@/routes/dashboard/groups/components/GroupDiscipline/GroupDiscipline"

const GroupDashboard = () => {
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

export default GroupDashboard
