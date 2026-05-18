import Home from "../pages/home";
import MisTareas from "../pages/MisTareas";
import Calendario from "../pages/Calendario";

export const childrenRouterList = [
    {
        index: true,
        Component: Home,
        text: "Inicio",
        path: "/",
    },
    {
        path: "tareas",
        Component: MisTareas,
        text: "Mis tareas",
    },
    {
        path: "calendario",
        Component: Calendario,
        text: "Calendario",
    },
];