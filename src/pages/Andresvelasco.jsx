import { useState } from "react";

const AndresVelasco = () => {
    const [newTask, setNewTask] = useState("");
    const [tasks, setTasks] = useState([]);

    const onChange = (e) => {
        setNewTask(e.target.value);
    };

    const onClick = () => {
        if (!newTask.trim()) return;
        const setNewTasks = [...tasks, newTask];
        setTasks(setNewTasks);
        setNewTask("");
    };

    return (
        <div>
            <h1>¿Cual es tu nombre?</h1>
            <input
                type="text"
                value={newTask}
                onChange={onChange}
            />
            <button onClick={onClick}>Guardar</button>
            {tasks.map((task, index) => (
                <p key={index}>{task}</p>
            ))}
        </div>
    );
};

export default AndresVelasco;