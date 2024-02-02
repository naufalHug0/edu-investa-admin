import { useEffect, useState } from "react"

const usePreviewMedia = (selectedFile) => {
    const [preview, setPreview] = useState('')

    useEffect(()=>{
        const objectUrl = selectedFile && URL.createObjectURL(selectedFile)
    
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    },[selectedFile])

    return [preview, setPreview]
}

export default usePreviewMedia