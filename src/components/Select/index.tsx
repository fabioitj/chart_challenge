import { ChangeEvent } from "react";

function Select({
    label, 
    handleOnChange, 
    children
} : {
    label: string,
    handleOnChange: (e: ChangeEvent<HTMLSelectElement>) => void,
    children: React.ReactElement[]
}) {
    return (
        <div>
            <label>{label}: </label>
            <select onChange={handleOnChange}>
                {children}
            </select>
        </div>
    )
}

export default Select;