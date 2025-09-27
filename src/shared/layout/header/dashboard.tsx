import React, { ReactNode } from "react"
import { HeaderLayout } from "."
import DashboardHeader from "@/shared/ui/dashboard-header"

export const DashboardHeaderLayout: React.FC<{
    caption: string
    buttonCaption: string
    children: ReactNode
    onButtonClick: () => void | Promise<void>
}> = ({ caption, buttonCaption, children, onButtonClick }) => {
    return (
        <HeaderLayout
            header={<DashboardHeader caption={caption} buttonCaption={buttonCaption} onButtonClick={onButtonClick} />}
        >
            {children}
        </HeaderLayout>
    )
}
