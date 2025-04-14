// Delays updating value


// Essentially is like "hey, I know this value is gonna be changing, 
// I'm gonna wait for it to not"

import { ReactElement, useDeferredValue, useMemo, useState } from "react";
export default function UseDeferredValue() {
    const [text, setText] = useState("");

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <DeferredList text={text} />
        </div>
    )
}

export function DeferredList({ text }: { text: string}): ReactElement {
    const LIST_SIZE = 10000;
    const deferredInput = useDeferredValue(text);

    const list = useMemo(() => {
        const listToReturn: ReactElement[] = [];

        for (let i = 0; i < LIST_SIZE; i++) {
            listToReturn.push(<div key={i}>{deferredInput}</div>)
        }

        return listToReturn;
    }, [deferredInput]);

    return list as any;
}