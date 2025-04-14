// Allows for optimistic UI updates while waiting for server responses

import { FormEvent, useOptimistic, useRef, useState, useTransition } from "react"

type Task = {
    name: string;
    id: string;
}

export default function UseOptimistic() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [tasks, setTasks] = useState<Task[]>([]);
    const [isPending, startTransition] = useTransition();
    const [optimisticTasks, setOptimisticTasks] = useOptimistic(tasks);

    async function handleAdding(e: FormEvent) {
        e.preventDefault();

        if (inputRef.current == null) return;

        // This will be overwritten after the actual update
        const newOptimisticTask: Task = {
            name: inputRef.current.value,
            id: "ID"
        }
        
        setOptimisticTasks(prevTasks => [...prevTasks, newOptimisticTask]);

        startTransition(async () => {
            const newTask = await createTask(inputRef.current!.value);
            setTasks(prevTasks => [...tasks, newTask]);
        })
    }

    return (
        <div>
            <form onSubmit={handleAdding}>
                <input
                    type="text"
                    ref={inputRef}
                    required
                />
                <button
                    onClick={handleAdding}
                />
            </form>
            <ul>
                { optimisticTasks.map((task) => {
                    return <li key={task.id}>{task.name}</li>
                })}
            </ul>
        </div>
    )
}

async function createTask(taskName: string): Promise<Task> {
    return new Promise<Task>((resolve) => {
        setTimeout(() => {
            resolve({
                name: `${taskName} from server`,
                id: Date.now().toString()
            });
        }, 2000);
    });
}