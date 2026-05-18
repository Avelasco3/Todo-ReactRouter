import { useState } from "react";

const MisTareas = ({ tasks = [], onAgregar, onEliminar, onToggle }) => {
    const [newTask, setNewTask] = useState("");
    const [fecha, setFecha] = useState("");
    const [categoria, setCategoria] = useState("");
    const [urgencia, setUrgencia] = useState("");
    const [activeTab, setActiveTab] = useState("todas");
    const [filtroCategoria, setFiltroCategoria] = useState("");
    const [filtroUrgencia, setFiltroUrgencia] = useState("");
    const [filtroFecha, setFiltroFecha] = useState("");

    const hoy = new Date().toISOString().split("T")[0];

    const urgenciaEstilo = {
        Alta: { background: "var(--urgency-alta-bg)", color: "var(--urgency-alta-txt)" },
        Media: { background: "var(--urgency-media-bg)", color: "var(--urgency-media-txt)" },
        Baja: { background: "var(--urgency-baja-bg)", color: "var(--urgency-baja-txt)" },
    };

    const categoriaEstilo = {
        Trabajo: { background: "var(--cat-trabajo-bg)", color: "var(--cat-trabajo-txt)" },
        Personal: { background: "var(--cat-personal-bg)", color: "var(--cat-personal-txt)" },
    };

    const guardarTarea = () => {
        if (!newTask.trim() || !fecha || !categoria || !urgencia) return;
        const tarea = {
            id: Date.now(),
            texto: newTask.trim(),
            fecha,
            categoria,
            urgencia,
            completada: false,
        };
        onAgregar(tarea);
        setNewTask("");
        setFecha("");
        setCategoria("");
        setUrgencia("");
    };

    const tareasFiltradas = tasks.filter((t) => {
        if (activeTab === "pendientes" && t.completada) return false;
        if (activeTab === "completadas" && !t.completada) return false;
        if (filtroCategoria && t.categoria !== filtroCategoria) return false;
        if (filtroUrgencia && t.urgencia !== filtroUrgencia) return false;
        if (filtroFecha === "hoy" && t.fecha !== hoy) return false;
        if (filtroFecha === "semana") {
            const fechaTarea = new Date(t.fecha);
            const hoyDate = new Date(hoy);
            const diff = (fechaTarea - hoyDate) / (1000 * 60 * 60 * 24);
            if (diff < 0 || diff > 7) return false;
        }
        return true;
    });

    const pendientes = tareasFiltradas.filter((t) => !t.completada);
    const completadas = tareasFiltradas.filter((t) => t.completada);

    const pillStyle = (activo) => ({
        border: `0.5px solid ${activo ? "var(--blue-primary)" : "var(--border-input)"}`,
        background: activo ? "var(--blue-subtle)" : "var(--bg-card)",
        borderRadius: "20px",
        padding: "4px 12px",
        fontSize: "11px",
        color: activo ? "var(--cat-trabajo-txt)" : "var(--text-muted)",
        cursor: "pointer",
    });

    const tabStyle = (activo) => ({
        padding: "5px 13px",
        borderRadius: "6px",
        fontSize: "12px",
        cursor: "pointer",
        border: "none",
        background: activo ? "var(--blue-subtle)" : "transparent",
        color: activo ? "var(--cat-trabajo-txt)" : "var(--text-muted)",
        fontWeight: activo ? "500" : "400",
    });

    const renderTarea = (tarea) => (
        <div
            key={tarea.id}
            style={{
                background: "var(--bg-card)",
                border: "0.5px solid var(--border-subtle)",
                borderRadius: "8px",
                padding: "10px 13px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                opacity: tarea.completada ? 0.4 : 1,
            }}
        >
            <div
                onClick={() => onToggle(tarea.id)}
                style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    border: `1.5px solid ${tarea.completada ? "var(--blue-primary)" : "var(--blue-subtle)"}`,
                    background: tarea.completada ? "var(--blue-primary)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    cursor: "pointer",
                    fontSize: "9px",
                    color: "#fff",
                }}
            >
                {tarea.completada && "✓"}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                    fontSize: "12px",
                    color: "var(--text-primary)",
                    textDecoration: tarea.completada ? "line-through" : "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}>
                    {tarea.texto}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                    <span style={{ fontSize: "10px", color: "var(--text-faint)" }}>
                        📅 {tarea.fecha}
                    </span>
                    <span style={{
                        fontSize: "9px",
                        padding: "1px 7px",
                        borderRadius: "20px",
                        fontWeight: "500",
                        ...urgenciaEstilo[tarea.urgencia]
                    }}>
                        {tarea.urgencia}
                    </span>
                    <span style={{
                        fontSize: "9px",
                        padding: "1px 7px",
                        borderRadius: "20px",
                        ...categoriaEstilo[tarea.categoria]
                    }}>
                        {tarea.categoria}
                    </span>
                </div>
            </div>

            <button
                onClick={() => onEliminar(tarea.id)}
                style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-faint)",
                    fontSize: "14px",
                    cursor: "pointer",
                    padding: "2px",
                    flexShrink: 0,
                }}
            >
                ✕
            </button>
        </div>
    );

    return (
        <div style={{ padding: "22px" }}>
            {/* Tabs */}
            <div style={{
                display: "flex",
                gap: "3px",
                marginBottom: "16px",
                background: "var(--bg-card)",
                border: "0.5px solid var(--border-subtle)",
                borderRadius: "8px",
                padding: "3px",
                width: "fit-content",
            }}>
                {["todas", "pendientes", "completadas"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={tabStyle(activeTab === tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Formulario */}
            <div style={{
                background: "var(--bg-card)",
                border: "0.5px solid var(--border-subtle)",
                borderRadius: "10px",
                padding: "14px",
                marginBottom: "14px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
            }}>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Nombre de la tarea..."
                    style={{
                        background: "var(--bg-base)",
                        border: "0.5px solid var(--border-input)",
                        borderRadius: "7px",
                        padding: "8px 11px",
                        fontSize: "12px",
                        color: "var(--text-primary)",
                        outline: "none",
                        width: "100%",
                    }}
                />
                <div style={{ display: "flex", gap: "8px" }}>
                    <input
                        type="date"
                        value={fecha}
                        min={hoy}
                        onChange={(e) => setFecha(e.target.value)}
                        style={{
                            background: "var(--bg-base)",
                            border: "0.5px solid var(--border-input)",
                            borderRadius: "7px",
                            padding: "8px 11px",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                            outline: "none",
                            flex: 1,
                        }}
                    />
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        style={{
                            background: "var(--bg-base)",
                            border: "0.5px solid var(--border-input)",
                            borderRadius: "7px",
                            padding: "8px 10px",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                            outline: "none",
                            cursor: "pointer",
                        }}
                    >
                        <option value="">Categoría</option>
                        <option value="Trabajo">Trabajo</option>
                        <option value="Personal">Personal</option>
                    </select>
                    <select
                        value={urgencia}
                        onChange={(e) => setUrgencia(e.target.value)}
                        style={{
                            background: "var(--bg-base)",
                            border: "0.5px solid var(--border-input)",
                            borderRadius: "7px",
                            padding: "8px 10px",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                            outline: "none",
                            cursor: "pointer",
                        }}
                    >
                        <option value="">Urgencia</option>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                    </select>
                    <button
                        onClick={guardarTarea}
                        style={{
                            background: "var(--blue-primary)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "7px",
                            padding: "8px 16px",
                            fontSize: "12px",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Guardar
                    </button>
                </div>
            </div>

            {/* Filtros */}
            <div style={{ display: "flex", gap: "6px", marginBottom: "14px", flexWrap: "wrap", alignItems: "center" }}>
                <button style={pillStyle(!filtroCategoria && !filtroUrgencia && !filtroFecha)}
                    onClick={() => { setFiltroCategoria(""); setFiltroUrgencia(""); setFiltroFecha(""); }}>
                    Todas
                </button>
                <button style={pillStyle(filtroCategoria === "Trabajo")} onClick={() => setFiltroCategoria(filtroCategoria === "Trabajo" ? "" : "Trabajo")}>Trabajo</button>
                <button style={pillStyle(filtroCategoria === "Personal")} onClick={() => setFiltroCategoria(filtroCategoria === "Personal" ? "" : "Personal")}>Personal</button>
                <span style={{ color: "var(--border-subtle)", fontSize: "16px" }}>|</span>
                <button style={pillStyle(filtroUrgencia === "Alta")} onClick={() => setFiltroUrgencia(filtroUrgencia === "Alta" ? "" : "Alta")}>Alta</button>
                <button style={pillStyle(filtroUrgencia === "Media")} onClick={() => setFiltroUrgencia(filtroUrgencia === "Media" ? "" : "Media")}>Media</button>
                <button style={pillStyle(filtroUrgencia === "Baja")} onClick={() => setFiltroUrgencia(filtroUrgencia === "Baja" ? "" : "Baja")}>Baja</button>
                <span style={{ color: "var(--border-subtle)", fontSize: "16px" }}>|</span>
                <button style={pillStyle(filtroFecha === "hoy")} onClick={() => setFiltroFecha(filtroFecha === "hoy" ? "" : "hoy")}>Hoy</button>
                <button style={pillStyle(filtroFecha === "semana")} onClick={() => setFiltroFecha(filtroFecha === "semana" ? "" : "semana")}>Esta semana</button>
            </div>

            {/* Pendientes */}
            {(activeTab === "todas" || activeTab === "pendientes") && (
                <>
                    <div style={{ fontSize: "10px", color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.07em", margin: "10px 0 7px" }}>
                        Pendientes · {pendientes.length}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        {pendientes.length === 0
                            ? <p style={{ fontSize: "12px", color: "var(--text-faint)" }}>Sin tareas pendientes</p>
                            : pendientes.map(renderTarea)
                        }
                    </div>
                </>
            )}

            {/* Completadas */}
            {(activeTab === "todas" || activeTab === "completadas") && (
                <>
                    <div style={{ fontSize: "10px", color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.07em", margin: "14px 0 7px" }}>
                        Completadas · {completadas.length}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        {completadas.length === 0
                            ? <p style={{ fontSize: "12px", color: "var(--text-faint)" }}>Sin tareas completadas</p>
                            : completadas.map(renderTarea)
                        }
                    </div>
                </>
            )}
        </div>
    );
};

export default MisTareas;