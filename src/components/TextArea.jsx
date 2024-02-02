import React from 'react'

const TextArea = ({
    placeholder,
    ...rest
}) => {
    return (
        <div>
        <label className="mb-3 block text-black dark:text-white">
            {placeholder}
        </label>
        <textarea
            {...rest}
            placeholder={placeholder}
            className="resize-none w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-4 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
        </div>
    )
}

export default TextArea