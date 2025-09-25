import React from "react"

interface IEmptyItemsDisplayProps {
    // It's fully correct API. ESLint ruining
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items?: any[]
    children: React.ReactNode
}

interface IContainsComponentProps {
    children?: React.ReactNode
}

interface IEmptyComponentProps {
    children?: React.ReactNode
}

const ContainsComponent: React.FC<IContainsComponentProps> = ({ children }) => {
    return <>{children}</>
}

const EmptyComponent: React.FC<IEmptyComponentProps> = ({ children }) => {
    return <>{children}</>
}

type EmptyItemsDisplayType = React.FC<IEmptyItemsDisplayProps> & {
    Contains: React.FC<IContainsComponentProps>
    Empty: React.FC<IContainsComponentProps>
}

const EmptyItemsDisplay = (({ items, children }: IEmptyItemsDisplayProps) => {
    let containsComponent = null
    let emptyComponent = null

    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) {
            return
        }

        if (child.type === EmptyItemsDisplay.Contains) {
            containsComponent = child
        }

        if (child.type === EmptyItemsDisplay.Empty) {
            emptyComponent = child
        }
    })

    if (!items?.length) {
        return <>{emptyComponent}</>
    } else {
        return <>{containsComponent}</>
    }
}) as EmptyItemsDisplayType

EmptyItemsDisplay.Contains = ContainsComponent
EmptyItemsDisplay.Empty = EmptyComponent

export default EmptyItemsDisplay
