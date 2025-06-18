import { useRef } from "react";

export function useVoiceOutput({ onEnd }) {
  const audioRef = useRef(null);

  async function speak(text) {
    const voice = "XIDOAz3OiK7rivbjZsDf"; // TODO: Replace with your actual ElevenLabs voice ID
    const response = await fetch("/api/elevenlabs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice }),
    });
    const data = await response.json();
    const audioUrl = data.audioUrl; // Adjust this if backend returns differently
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.onended = onEnd;
      audioRef.current.play();
    }
  }

  return { speak, audioRef };
} 