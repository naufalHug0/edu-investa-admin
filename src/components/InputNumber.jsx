import React from 'react'

const InputNumber = ({
    onChange,
    min = undefined,
    max = undefined,
    ...rest
}) => {
    const handleChanges = e => {
        e.target.value = e.target.value.replace(/^0+/, "")

        let value = e.target.value == '' ? (min || 0) : Math.max(1, Math.min(max || parseInt(e.target.value), parseInt(e.target.value)))

        onChange(e, value)
    }

    return (
        <input
            type="number"
            min={min}
            max={max}
            onChange={handleChanges}
            {...rest}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
    )
}

export default InputNumber