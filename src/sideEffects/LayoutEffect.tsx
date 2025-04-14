// Description: Similar to useEffect but goes after each DOM change
// Use Cases: layout updates, because it runs before rendering

// Attempt to use useEffect before

// Essentially when you're altering positioning that would be visible to the user, use this.

import React, { useLayoutEffect, useState } from "react";

export default function LayoutEffect() {
    const [count, setCount] = useState(0);

    // Triggered before rendering, but after calculation
    useLayoutEffect(() => {
        console.log("Count", count);
    }, [count]);

    function increaseCount() {
        setCount(prevCount => prevCount + 1);
    }

    return (
        <span>
            <span>{count}</span>
            <button onClick={increaseCount}>Increase</button>
        </span>
    )
}