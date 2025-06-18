import React from "react";

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button onClick={onToggle} style={{
      position: "absolute",
      top: 16,
      right: 16,
      background: "none",
      border: "none",
      fontSize: 24,
      cursor: "pointer"
    }}>
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
} 