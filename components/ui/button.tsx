import React from "react";

export function Button({ children, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                background: "#0070f3",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer"
            }}
        >
            {children}
        </button>
    );
}
