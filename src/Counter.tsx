import { useCallback, useEffect, useReducer, useState } from "react"

const COUNTER_ACTIONS = {
    INCREASE: "INCREASE",
    DECREASE: "DECREASE"
}

export default function Counter() {
    const [valueState, valueDispatch] = useReducer(valueReducer, { count: 0 });
    const [increaseState, setIncreaseState] = useState(false);

    
    const increaseCount = useCallback(() => {
        valueDispatch({ type: COUNTER_ACTIONS.INCREASE });
    }, [])
    
    // Handles increasing behavior
    useEffect(() => {
        if (!increaseState) return;

        const increaseInterval = setInterval(() => {
            increaseCount();
        }, 1000);

        const timeoutClear = setTimeout(() => {
            clearInterval(increaseInterval);
        }, 100)

        return (() => {   
            setIncreaseState(false);
            clearTimeout(timeoutClear);
            clearInterval(increaseInterval);
        });
        
    }, [increaseState, increaseCount]);


    function valueReducer(state: { count: number }, action: any) {
        switch (action.type) {
            case COUNTER_ACTIONS.INCREASE: {
                return { count: state.count + 1 }
            }
            case COUNTER_ACTIONS.DECREASE: {
                const toSet = (state.count > 0) ? state.count - 1 : 0;
                return { count: toSet }
            }
            default: {
                return { count: state.count }
            }
        }
    }

    return (
        <div>
            <button 
                onClick={() => valueDispatch({ type: COUNTER_ACTIONS.INCREASE })}
                onMouseDown={() => setIncreaseState(true)}
                onMouseUp={() => setIncreaseState(false)}
                onMouseLeave={() => setIncreaseState(false)}
            >
                Increase
            </button>
            <div>{valueState.count}</div>
            <button onClick={() => valueDispatch({ type: COUNTER_ACTIONS.DECREASE })}>Decrease</button>
        </div>
    )
}