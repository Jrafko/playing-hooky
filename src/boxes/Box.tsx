import "./Box.css";

export default function Box({id, onState, updateStateFunc} : { id: string, onState: string[], updateStateFunc: Function}) {
    
    return (
        <button
            id={id}
            className="box"
            style={{ backgroundColor: 
                onState.includes(id) ?
                "green" : "red"
            }}
            onClick={() => updateStateFunc(id)}
        >
            {id}
        </button>
    )
}
