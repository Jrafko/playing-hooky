 // Memoizes calculations to avoid recomputation on re-render

import { useCallback, useEffect, useState } from "react";

export default function UseCallback() {
    const [curNum, setCurNum] = useState(1);
    const [dark, setDark] = useState(false);

    // Will update no matter what, bad news bears
    /*
    function getItems() {
        return [curNum, curNum + 1, curNum + 2];
    }
    */
    
    // Like useMemo, but will save the entire function not the return value
    const getItems = useCallback((increaser: number) => {
        return [curNum + increaser, curNum + 1, curNum + 2];
    }, [curNum]);
    
    const styles = {
        backgroundColor: dark ? "black" : "white",
        color: dark ? "white" : "black"
    }
    
    return (
        <>
            <span>
                <input 
                    type="number" 
                    value={curNum} 
                    onChange={(e) => setCurNum(Number(e.target.value))}
                />
                <button onClick={() => setDark(prevDark => !prevDark)}>Change C O L O R</button>
            </span>
            <MyListComp getItemsFunc={getItems} />
        </>
    )
}

export function MyListComp({getItemsFunc}: { getItemsFunc: (num: number) => number[]}) {
    const [items, setItems] = useState<number[]>([]);

    useEffect(() => {
        setItems(getItemsFunc(5));
        console.log("Updating items!");
    }, [getItemsFunc]);

    return(
        <>
           { items.map((item) => <div key={item}>{item}</div>)}
        </>
    ) 
}