import React from 'react'

const InputText = ({
    placeholder,
    ...rest
}) => {
    return (
        <div>
        <label className="mb-3 block text-black dark:text-white">
            {placeholder}
        </label>
        <input
            type="text"
            {...rest}
            placeholder={placeholder}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
        </div>
    )
}

export default InputText