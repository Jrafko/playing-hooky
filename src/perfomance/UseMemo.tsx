// Memoizes calculations to avoid recomputation on re-render

import { useMemo, useState } from "react";

export default function UseMemo() {
    const [curNum, setCurNum] = useState(1);
    const [dark, setDark] = useState(false);

    // Does not save the function, just the result
    const doubleNumber = useMemo(() => {
        return slowFunction(curNum);
    }, [curNum]);
    
    const styles = {
        backgroundColor: dark ? "black" : "white",
        color: dark ? "white" : "black"
    }
    
    return (
        <span>
            <input type="number" value={curNum} onChange={(e) => setCurNum(Number(e.target.value))}></input>
            <button onClick={() => setDark(prevDark => !prevDark)}>Change C O L O R</button>
            <span style={styles}>{doubleNumber}</span>
        </span>
    )
}

function slowFunction(num: number): number {
    console.log("Slow ass function");
    for (let i = 0; i < 1000000000; i++) {}
    return num * 2;
}