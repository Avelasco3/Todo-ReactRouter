import { useState } from "react";

const estiloAnimaciones = `
@keyframes entrar {
    from {
        opacity: 0;
        transform: translateY(-8px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

@keyframes salir {
    from {
        opacity: 1;
        transform: translateX(0) scale(1);
    }
    to {
        opacity: 0;
        transform: translateX(30px) scale(0.96);
    }
}

.tarea-entrando {
    animation: entrar 0.3s ease forwards;
}

.tarea-saliendo {
    animation: salir 0.3s ease forwards;
    pointer-events: none;
}
`;

const AndresVelasco = () => {
    const [newTask, setNewTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [eliminandoId, setEliminandoId] = useState(null);

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
        setEliminandoId(id);
        setTimeout(() => {
            setTasks((prev) => prev.filter((t) => t.id !== id));
            setEliminandoId(null);
        }, 300);
    };

    return (
        <div>
            {/* Inyectar estilos de animación */}
            <style>{estiloAnimaciones}</style>

            <h1>¿Cual es tu nombre?</h1>

            <input
                type="text"
                value={newTask}
                onChange={onChange}
            />
            <button onClick={onClick}>Guardar</button>

            {tasks.map((task) => (
                <div
                    key={task.id}
                    className={eliminandoId === task.id ? "tarea-saliendo" : "tarea-entrando"}
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
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