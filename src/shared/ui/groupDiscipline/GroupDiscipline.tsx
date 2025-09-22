"use client"

import EmptyItemsDisplay from "@/shared/ui/EmptyItemsDisplay/EmptyItemsDisplay"
import Header from "../../../routes/dashboard/components/Header/Header"
import styles from "./groupDiscipline.module.css"
import Modal from "../../../routes/dashboard/components/Modal/Modal"
import ModalLabel from "../../../routes/dashboard/components/ModalLabel/ModalLabel"
import ModalButtons from "../../../routes/dashboard/components/ModalButtons/ModalButtons"
import useGroupDiscipline from "./useGroupDiscipline"
import ErrorReloadMessage from "@/shared/ui/ErrorReloadMessage/ErrorReloadMessage"
import DisciplineItem from "./components/DisciplineItem "
import EmptyResultMessage from "@/shared/ui/EmptyResultMessage/EmptyResultMessage"
import { AvailableDisciplineTypePayload, DisciplineTypePayload } from "@/shared/models/responses"
import React from "react"
import InlinePreloader from "@/shared/ui/InlinePreloader/InlinePreloader"
import BlockCentre from "@/shared/ui/BlockCentre/BlockCentre"

interface IGroupDisciplineProps {
    id: number
    title: string
}

const GroupDiscipline: React.FC<IGroupDisciplineProps> = ({ id, title }) => {
    const {
        state,
        teachersState,
        isModalOpen,
        formData,
        setFormData,
        cancelHandler,
        openCreateHandler,
        openUpdateHandler,
        submitHandler,
        deleteHandler,
    } = useGroupDiscipline(id)

    if (state.isLoading) {
        return (
            <BlockCentre>
                <InlinePreloader size={"lg"} />
            </BlockCentre>
        )
    }

    if (state.isError) {
        return <ErrorReloadMessage />
    }

    if (teachersState.isLoading) {
        return (
            <BlockCentre>
                <InlinePreloader size={"lg"} />
            </BlockCentre>
        )
    }

    if (teachersState.isError) {
        return <ErrorReloadMessage />
    }

    return (
        <div className={styles.page}>
            <Header
                caption={`Управление дисциплинами группы ${title}`}
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
                    type="select"
                    value={formData.teacherId.toString()}
                    selectItems={teachersState.content.items.map((teacher) => ({
                        placeholder: <strong>{teacher.name}</strong>,
                        value: teacher.id,
                    }))}
                    required
                    onChange={(val) =>
                        setFormData((prev) => ({
                            ...prev,
                            teacherId: parseInt(val),
                        }))
                    }
                />
                <ModalLabel
                    label="Количество занятий"
                    type="select"
                    value={formData.lessonsCount.toString()}
                    // todo: replace
                    selectItems={Array.from(Array(10).keys()).map((i) => ({
                        value: i,
                        placeholder: <strong>{i}</strong>,
                    }))}
                    required
                    onChange={(val) =>
                        setFormData((prev) => ({
                            ...prev,
                            lessonsCount: parseInt(val),
                        }))
                    }
                />
                <ModalLabel
                    label="Тип дисциплины"
                    type="select"
                    value={formData.disciplineType}
                    // todo: replace
                    selectItems={AvailableDisciplineTypePayload.map((disciplineType) => ({
                        value: disciplineType,
                        placeholder: <strong>{disciplineType}</strong>,
                    }))}
                    required
                    onChange={(val) =>
                        setFormData((prev) => ({
                            ...prev,
                            disciplineType: val as DisciplineTypePayload,
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

export default GroupDiscipline
