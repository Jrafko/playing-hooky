// Defers state management


// Allows us to basically rank how important certain state changes are to us

// Should only be used when needed; it will cause more renders\
import { ChangeEvent, ChangeEventHandler, useDeferredValue, useEffect, useState, useTransition } from "react";



// Getting card information from an api
// will be X amount of cards
// each card's state is independent
export default function UseTransition() {
    // If we're on the front side or the back side
    const [isFront, setIsFront] = useState(true);

    function handleFlip(e) {
        console.log("Flipping the card");
        setIsFront(prevIsFront => !prevIsFront);
    }


    return (
        <div>
            <h1>Flashcard!</h1>

            {/* Front side */}
            {isFront && 
                <div>
                    front
                </div>
            }

            {/* Back side */}
            {!isFront && 
                <div>
                    back
                </div>
            }

            <button onClick={handleFlip}>
                Flip!
            </button>
        </div>
    );

    /*
    const [isPending, startPendingTransition] = useTransition();
    const [text, setText] = useState("");
    const deferredText = useDeferredValue(text);
    const [list, setList] = useState<string[]>([]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setText(e.target.value);

        startPendingTransition(() => {
            const listToSet = [];
            console.log("Finished and executed");
            for (let i = 0; i < 20000; i++) {
                listToSet.push(e.target.value);
            }

            setList(listToSet);
        });
    }

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => handleChange(e)}
            />
            {isPending
                ? "Loading..."
                : list.map((item, index) => {
                    return <div key={index}>{item}</div>
                })}
        </div>
    )
        */
}


// Can flip a card
// has two sides 
const Card = (props) => {
    const [displaySide, setDisplaySide] = useState();

    const handleClick = () => {

    };

    return (
        <div onClick={handleClick()}>

        </div>
    );
};

const Flashcards = () => {
    const list = [];
    return (
        <div>

        </div>
    );
};