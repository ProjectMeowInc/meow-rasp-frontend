import React, { useEffect } from "react"

export const useEffectAsync = (effect: () => Promise<void>, deps: React.DependencyList) => {
    useEffect(() => {
        effect().then(() => {})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}
