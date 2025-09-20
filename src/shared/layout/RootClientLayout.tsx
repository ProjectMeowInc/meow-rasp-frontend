"use client"

import React, { PropsWithChildren } from "react"
import { ToastContainer } from "react-toastify"

const RootClientLayout: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <div>
            <ToastContainer/>
            {children}
        </div>
    )
}

export default RootClientLayout