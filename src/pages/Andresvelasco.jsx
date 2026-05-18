import { useState } from "react";

const AndresVelasco = () => {
    const [newTask, setNewTask] = useState("");
    const [tasks, setTasks] = useState([]);

    const onChange = (e) => {
        setNewTask(e.target.value);
    };

    const onClick = () => {
        if (!newTask.trim()) return;
        const tarea = { id: Date.now(), texto: newTask.trim() };
        setTasks([...tasks, tarea]);
        setNewTask("");
    };

    const eliminarTarea = (id) => {
        setTasks(tasks.filter((t) => t.id !== id));
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

            {tasks.map((task) => (
                <div key={task.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {/* Checkbox para eliminar */}
                    <input
                        type="checkbox"
                        onChange={() => eliminarTarea(task.id)}
                        title="Marcar para eliminar"
                    />
                    <p style={{ margin: 0 }}>{task.texto}</p>
                    {/* Botón para eliminar */}
                    <button onClick={() => eliminarTarea(task.id)}>
                        Eliminar
                    </button>
                </div>
            ))}
        </div>
    );
};

export default AndresVelasco;