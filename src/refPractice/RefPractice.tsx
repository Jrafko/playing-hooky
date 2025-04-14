import { useCallback, useRef, useState } from "react"
import CustomInput from "./CustomInput";
import React from "react";

type config = {
    name: string;
    label: string;
    type: string;
    value?: string | number | boolean;
}

export default function RefPractice( { formConfig } : { formConfig: config[] }) {
    const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

    function printValues() {
        const printObj: Record<string, string | number | boolean> = {}
        for (const key of Object.keys(inputRefs.current)) {
            if (inputRefs.current[key]?.type !== "checkbox") {
                printObj[key] = inputRefs.current[key]!.value;
            } else {
                printObj[key] = inputRefs.current[key]!.checked;
            }
        }

        console.log(printObj);
    }

    return (
        <div>
            {formConfig.map((element) => (
                <div key={element.label}>
                    <label>{element.label}</label>
                    <input
                        ref={(thisElement) => {
                            inputRefs.current[element.name] = thisElement;
                        }}
                        type={element.type}
                    />
                </div>
            ))}
            <button onClick={printValues}>Output</button>
        </div>
    )
}