import React from "react";

export default function ChatBubble({ text, sender }) {
  const isBot = sender === "bot";
  return (
    <div style={{
      display: "flex",
      justifyContent: isBot ? "flex-start" : "flex-end",
      margin: "8px 0"
    }}>
      <div style={{
        background: isBot ? "#f0f0f0" : "#007aff",
        color: isBot ? "#222" : "#fff",
        borderRadius: 18,
        padding: "10px 16px",
        maxWidth: 320,
        fontSize: 16,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
      }}>
        {text}
      </div>
    </div>
  );
} 