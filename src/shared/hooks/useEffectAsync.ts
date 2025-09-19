import React, { useEffect } from "react"

export const useEffetcAsync = (effect: () => Promise<void>, deps: React.DependencyList) => {
    useEffect(() => {
        effect().then(() => { })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}
