import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './App.css';
import Layout from "./components/Layout";
import { childrenRouterList } from "./components/routes";

const router = createBrowserRouter([
    {
        Component: Layout,
        children: childrenRouterList,
    },
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;