import React from "react";

export function Label({ children }) {
    return <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>{children}</label>;
}
