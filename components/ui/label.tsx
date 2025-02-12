import React from "react";

export function Label({ children, htmlFor, className = "" }) {
    return (
        <label htmlFor={htmlFor} className={`font-bold block mb-2 ${className}`}>
            {children}
        </label>
    );
}
