import React from "react";

export default function BotAvatar({ talking }) {
  return (
    <div
      className={"bot-avatar" + (talking ? " talking" : "")}
      style={{
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "#222",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 32,
        color: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      🤖
    </div>
  );
} 