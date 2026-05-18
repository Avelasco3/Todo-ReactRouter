import { useState } from "react";

const AndresVelasco = () => {
    const [newTask, setNewTask] = useState("");
    const [tasks, setTasks] = useState([]);

    const onChange = (e) => {
        //console.dir(e)
        setNewTask(e.target.value);
    }

    const onClick = () => {
        const setNewTasks = [...tasks, newTask];
        setTasks(setNewTasks);
        setNewTask("");
    }

    return(
        <div>
            <h1>¿Cual es tu nombre?</h1>
            <input type="text" onChange={onChange} /><button onClick={onClick}>Guardar</button>
            {tasks.map((task) => <p>{task}</p>)}
        </div>
    );
};
export default AndresVelasco;