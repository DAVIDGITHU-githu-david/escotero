import React from "react";

interface InputProps {
    id?: string;
    type?: string;
    value: any;
    onChange: (e: any) => void;
    placeholder?: string;
    readOnly?: boolean;
    className?: string;
}

export function Input({ id, type = "text", value, onChange, placeholder, readOnly, className = "" }: InputProps) {
    return (
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
            className={`border border-gray-300 p-2 rounded-md w-full ${className}`}
        />
    );
}
