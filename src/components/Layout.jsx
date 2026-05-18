import { Link, Outlet, useLocation } from "react-router";

const Layout = () => {
    const location = useLocation();

    const navItems = [
        { path: "/", label: "Inicio", icon: "🏠" },
        { path: "/tareas", label: "Mis tareas", icon: "✅" },
        { path: "/calendario", label: "Calendario", icon: "📅" },
    ];

    return (
        <div className="layout">
            <aside className="sidebar">
                {/* Brand */}
                <div style={{
                    padding: "20px 18px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    borderBottom: "0.5px solid var(--border-subtle)"
                }}>
                    <div style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: "var(--blue-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px"
                    }}>✓</div>
                    <span style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "var(--text-primary)"
                    }}>Taskly</span>
                </div>

                {/* Navegación */}
                <nav style={{ padding: "10px 8px", flex: 1 }}>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "9px",
                                    padding: "8px 10px",
                                    borderRadius: "7px",
                                    marginBottom: "2px",
                                    fontSize: "13px",
                                    textDecoration: "none",
                                    color: isActive ? "#fff" : "var(--text-muted)",
                                    background: isActive ? "var(--blue-subtle)" : "transparent",
                                    transition: "background 0.15s, color 0.15s"
                                }}
                            >
                                <span>{item.icon}</span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer usuario */}
                <div style={{
                    padding: "12px 8px",
                    borderTop: "0.5px solid var(--border-subtle)"
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "9px",
                        padding: "8px 10px"
                    }}>
                        <div style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: "var(--blue-subtle)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "var(--cat-trabajo-txt)",
                            flexShrink: 0
                        }}>AV</div>
                        <span style={{
                            fontSize: "12px",
                            color: "var(--text-muted)"
                        }}>Andrés Velasco</span>
                    </div>
                </div>
            </aside>

            {/* Contenido */}
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;