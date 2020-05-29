import { useState } from 'react'

export const useInputChange = () => {
    const [input, setInput] = useState({})

    const handleInputChange = (e) => setInput({
        ...input,
        [e.name]: e.value
    })

    return [input, handleInputChange]
}