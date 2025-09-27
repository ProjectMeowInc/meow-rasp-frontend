import React from "react"
import { OnCloseFn } from "@/shared/types"
import { EditCorpusModal } from "@/features/corpus/editing-corpus/ui/edit-corpus-modal"
import { CreateCorpusModal } from "@/features/corpus/create-corpus/ui/create-corpus-modal"

export const CreateOrEditCorpusModal: React.FC<{
    editingId: number | null
    isOpen: boolean
    onClose: OnCloseFn
}> = ({ isOpen, editingId, onClose }) => {
    if (editingId) {
        return <EditCorpusModal corpusId={editingId} onClose={onClose} isOpen={isOpen} />
    } else {
        return <CreateCorpusModal isOpen={isOpen} onClose={onClose} />
    }
}
