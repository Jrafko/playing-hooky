// Customize the exposed ref API when using forwardRef

import { ChangeEventHandler, useRef, useState, RefObject } from "react";

export default function UseImperativeHandle() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [textVal, setTextVal] = useState("");

    return (
        <div>
            <input
                ref={inputRef}
                type="text"
                value={textVal}
                onChange={(e) => setTextVal(e.target.value)}
            />
            <br />
            <button onClick={() => inputRef.current!.focus()}>
                Focus
            </button>
            
        </div>
    )
}

export function CustomInput({ ref, text, changeFunc } : {ref: RefObject<HTMLInputElement>, text: string, changeFunc: ChangeEventHandler}) {
    return (
        <input
            ref={ref}
            value={text}
            onChange={changeFunc}
        />
    )
}