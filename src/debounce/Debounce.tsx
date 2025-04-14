import { ChangeEvent, useEffect, useReducer, useState } from "react";

const SEARCH_ACTIONS = {
    IDLE: "IDLE",
    TYPING: "TYPING",
    LOADING: "LOADING",
    LOADED: "LOADED"
}

type SearchStates = keyof typeof SEARCH_ACTIONS;

function userStatusReducer(state: string, action: string) {
    return action;
}

export default function Debounce() {

    async function callFunction(query: string): Promise<null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Called!");
                resolve(null);
            }, 1000);
        })
    }

    return (
        <div>
            <DebouncedSearch fetchResultsFunction={callFunction}/>
        </div>
    )
}

function DebouncedSearch({ fetchResultsFunction } : { fetchResultsFunction: Function }) {
    const [isLoading, setIsLoading] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const [userState, userStateDispatch] = useReducer(userStatusReducer, SEARCH_ACTIONS.IDLE );

    useEffect(() => {
        if(!inputVal) {
            userStateDispatch(SEARCH_ACTIONS.IDLE);
        }

        userStateDispatch(SEARCH_ACTIONS.TYPING);

        const fetchTimout = setTimeout( async () => {
            userStateDispatch(SEARCH_ACTIONS.LOADING)
            await fetchResultsFunction(inputVal);
            userStateDispatch(SEARCH_ACTIONS.LOADED);
        }, 500);

        return () => {
            clearTimeout(fetchTimout);
        }
    }, [inputVal, fetchResultsFunction]);

    return (
        <div>
            <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
            />
            {
                <div>
                    {userState}
                </div>
            }
        </div>
    )
}