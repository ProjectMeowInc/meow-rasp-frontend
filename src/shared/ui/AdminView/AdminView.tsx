"use client"

import React, { ReactNode, useState } from "react"
import { useFirstLoading } from "@/shared/hooks/useFirstLoading"

interface IAdminViewProps {
    children: ReactNode
}

const AdminView: React.FC<IAdminViewProps> = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false)

    useFirstLoading(() => {
        const role = localStorage.getItem("role")

        if (role === "admin") {
            setIsAdmin(true)
        }
    })

    return isAdmin ? <>{children}</> : <></>
}

export default AdminView
