import React, { useState } from 'react'

const useGenerateId = (initialValue = 0) => {
    const [currentId, setCurrentId] = useState(initialValue)

    const generateId = () => {
        setCurrentId(currentId+1)
        return currentId
    }

    return generateId
}

export default useGenerateId