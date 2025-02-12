import React from "react";

export function Card({ children }) {
    return <div style={{
        border: "1px solid #ccc", 
        padding: "20px", 
        borderRadius: "8px", 
        boxShadow: "2px 2px 10px rgba(0,0,0,0.1)"
    }}>{children}</div>;
}

export function CardHeader({ children }) {
    return <h2 style={{ marginBottom: "10px" }}>{children}</h2>;
}

export function CardTitle({ children }) {
    return <h3 style={{ marginBottom: "10px" }}>{children}</h3>;
}

export function CardContent({ children }) {
    return <div>{children}</div>;
}
