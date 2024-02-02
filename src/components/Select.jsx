import React from 'react'

const Select = ({
    options = [],
    values = [],
    ...rest
}) => {
    return (
        <select {...rest}  className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary appearance-none'>
            {
                options.map((option, i) => {
                    return <option value={values[i]} key={i} defaultValue={i == 0}>{option}</option>
                })
            }
        </select>
    )
}

export default Select