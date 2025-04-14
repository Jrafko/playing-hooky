import React, {useState, useReducer, FormEvent} from "react";

type Task = { 
    id: number, 
    name: string, 
    complete: boolean
}

const TASK_ACTIONS = {
    ADD_TODO: "ADD_TODO",
    TOGGLE_TODO: "TOGGLE_TODO",
    DELETE: "DELETE"
}

// Description: Used for complex state management
export default function Reducer() {
    return (
        <div>
            {Counter()}
            {TodoList()}
        </div>
    )   
}

function Counter() {
    const ACTIONS = {
        INCREMENT: "INCREMENT",
        DECREMENT: "DECREMENT"
    }

    // "countDispatch" essentially ties itself to "countReducer" and automatically passes in "countState"
    // second param of useReducer is the initial state
    const [countState, countDispatch] = useReducer(countReducer, {count: 0});

    function countReducer(state: { count: number; }, action: any) {
        switch (action.type) {
            case ACTIONS.INCREMENT:
                return { count: state.count + 1 }
            case ACTIONS.DECREMENT:
                return { count: state.count - 1 }
            default:
                return { count: state.count }
        }
    }

    function increment() {
        countDispatch({type: ACTIONS.INCREMENT});
    }

    function decrement() {
        countDispatch({type: ACTIONS.DECREMENT});
    }

    return (
        <span>
            <button style={{width: "100px", fontSize: "20px"}} onClick={increment}>+</button>
            <h1>{countState.count}</h1>
            <button style={{width: "100px", fontSize: "20px"}} onClick={decrement}>-</button>
        </span>
    );
}

function TodoList() {
    const [todos, todosDispatch] = useReducer(todoReducer, [] as Task[]);
    const [name, setName] = useState("");

    function todoReducer(tasks: Task[], 
                        action: { type: string; payload?: { name?: string; id?: number} }) {
        switch (action.type) {
            case TASK_ACTIONS.ADD_TODO:
                return [...tasks, newTask(action.payload!.name as string)];
            case TASK_ACTIONS.TOGGLE_TODO:
                return tasks.map(task => {
                    if (task.id === action.payload!.id) {
                        return {...task, complete: !task.complete};
                    }
                    return task;
                });
            case TASK_ACTIONS.DELETE:
                return tasks.filter(task => task.id !== action.payload!.id);
            default:
                return tasks;
        }
    }

    function newTask(taskName: string) {
        return { id: Date.now(), name: taskName, complete: false }
    }

    function handleSubmit(e: FormEvent<HTMLElement>) {
        e.preventDefault();
        todosDispatch({ type: TASK_ACTIONS.ADD_TODO, payload: { name: name }});
    }

    console.log(todos);

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e as FormEvent<HTMLElement>)}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </form>
            {todos.map(todo => (
                <div key={todo.id}>
                    <span style={{color: todo.complete ? "green" : "red" }}>{todo.name}</span>
                    <button onClick={() => todosDispatch({ type: TASK_ACTIONS.TOGGLE_TODO, payload: { id: todo.id}})}>Toggle</button>
                    <button onClick={() => todosDispatch({type: TASK_ACTIONS.DELETE, payload: { id: todo.id }})}>Delete</button>
                </div>
            ))}
        </>
    )
}



