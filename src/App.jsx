import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { useState, useEffect } from "react";
import './App.css';
import Layout from "./components/Layout";
import Home from "./pages/home";
import MisTareas from "./pages/MisTareas";
import Calendario from "./pages/Calendario";

const router = createBrowserRouter([
    {
        Component: Layout,
        children: [
            {
                index: true,
                element: null,
            },
            {
                path: "tareas",
                element: null,
            },
            {
                path: "calendario",
                element: null,
            },
        ],
    },
]);

function App() {
    const [tasks, setTasks] = useState(() => {
        try {
            const guardadas = localStorage.getItem("taskly-tareas");
            return guardadas ? JSON.parse(guardadas) : [];
        } catch {
            return [];
        }
    });

    // Sincronizar con localStorage cada vez que tasks cambie
    useEffect(() => {
        localStorage.setItem("taskly-tareas", JSON.stringify(tasks));
    }, [tasks]);

    const agregarTarea = (tarea) => {
        setTasks((prev) => [...prev, tarea]);
    };

    const eliminarTarea = (id) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    const toggleCompletada = (id) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t))
        );
    };

    const routerWithProps = createBrowserRouter([
        {
            Component: Layout,
            children: [
                {
                    index: true,
                    element: <Home tasks={tasks} />,
                },
                {
                    path: "tareas",
                    element: (
                        <MisTareas
                            tasks={tasks}
                            onAgregar={agregarTarea}
                            onEliminar={eliminarTarea}
                            onToggle={toggleCompletada}
                        />
                    ),
                },
                {
                    path: "calendario",
                    element: <Calendario tasks={tasks} />,
                },
            ],
        },
    ]);

    return <RouterProvider router={routerWithProps} />;
}

export default App;