import React from "react";

export default function Controls({ onStart, onEnd, isActive }) {
  return (
    <div style={{ display: "flex", gap: 16, justifyContent: "center", margin: "24px 0" }}>
      <button onClick={onStart} disabled={isActive} style={{ fontSize: 18, padding: "10px 24px", borderRadius: 24, background: isActive ? "#ccc" : "#007aff", color: "#fff", border: "none" }}>Start Conversation</button>
      <button onClick={onEnd} style={{ fontSize: 18, padding: "10px 24px", borderRadius: 24, background: "#ff3b30", color: "#fff", border: "none" }}>End Call</button>
    </div>
  );
} 