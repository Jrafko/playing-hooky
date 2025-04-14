import React from "react";
import { ChangeEvent, useState } from "react"


function CustomInput({ index, type, updateFunction } : { index: number, type: string, updateFunction: Function }) {
    const [inputVal, setInputVal] = useState((type === "text" ? "" : 0));

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInputVal(e.target.value);
        if (type !== "checkbox") {
            updateFunction(index, e.target.value);
        } else {
            updateFunction(index, e.target.checked);
        }
    }
    
    return (
        <div>
            <input
                type={type}
                value={inputVal}
                onChange={handleChange}
            >
            </input>
        </div>
    )
}

export default React.memo(CustomInput);