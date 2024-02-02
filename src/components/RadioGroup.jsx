import React, { useState } from 'react'

const RadioGroup = ({ children }) => {
    const [selectedValue, setSelectedValue] = useState(null);

    const handleRadioChange = (value) => {
        setSelectedValue(value)
    }

    return React.Children.map(children, (child) =>
        React.cloneElement(child, {
            checked: child.props.value === selectedValue,
            onChange: () => console.log(child.props.value),
        })
    )
}

export default RadioGroup