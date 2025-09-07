import { useEffect } from "react"

/* 
If we use useEffect like this:
```ts
useEffect(() => {...}, [callback])

```
Behaviour are changed!
*/

/* eslint-disable react-hooks/exhaustive-deps */

export const useFirstLoading = (callback: () => void) => {
    useEffect(() => {
        callback()
    }, [])
}

export const useFirstLoadingAsync = (callback: () => Promise<void>) => {
    useEffect(() => {
        callback().then(() => {})
    }, [])
}

/* eslint-enable react-hooks/exhaustive-deps */
