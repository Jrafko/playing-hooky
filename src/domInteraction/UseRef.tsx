// Mutable object that persists across renders without causing re-renders


// Essentially can hold values that don't re-render when changed
// Commonly used to reference components
// Also used to hold previous states if needed

import { FormEvent, useEffect, useRef, useState } from "react";

// Used for accessing DOM elements and storing values
export default function UseRef() {
    const [name, setName] = useState("");
    const renderCount = useRef(1);
    const prevState = useRef("");

    const inputRef = useRef<HTMLInputElement>(null);


    const nameRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const idRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        renderCount.current = renderCount.current + 1;
    });

    useEffect(() => {
        prevState.current = name;
    }, [name]);

    function focus() {
        console.log(inputRef.current);
        inputRef.current!.focus();
    }


    function submission(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(`Person with name ${nameRef.current?.value} who is ${ageRef.current} years old`);
    }

    return (
        <div>
            <input
                ref={inputRef}
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <button onClick={focus}>Focus</button>
            <div>My name is {name}</div>
            <div>But it was {prevState.current}</div>
            <div>I've rendered {renderCount.current} times</div>

            <form onSubmit={(e) => submission(e)}>
                <input
                    ref={nameRef}
                    type="text"
                    placeholder="Name"
                />

                <input
                    ref={ageRef}
                    type="number"
                    placeholder="age"
                />

                <input
                    ref={idRef}
                    type="number"
                    placeholder="id"
                />

                <button
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}