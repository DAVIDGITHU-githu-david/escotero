import React from "react";

export function Input({ type = "text", value, onChange }) {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "100%",
                marginBottom: "10px"
            }}
        />
    );
}
