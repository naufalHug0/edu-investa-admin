import React from 'react'

const Radio = ({
    value,
    checked,
    onChange
}) => {
    return (
        <>
        <input type="radio" id={value} value={value} checked={checked} onChange={onChange} className=''/>
        <label htmlFor={value}  className={`flex justify-between items-center gap-4 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition ${checked ? 'border-primary bg-border-primary bg-opacity-50':''} disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input`}>
            {value}
            <div className='border w-4 h-4 rounded-full border-primary'>
                {
                    checked && <span className='w-3 h-3 bg-primary rounded-full'></span>
                }
            </div>
        </label>
        </>
    )
}

export default Radio