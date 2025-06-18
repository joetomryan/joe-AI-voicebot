import { useRef } from "react";

export function useVoiceOutput({ onEnd }) {
  const audioRef = useRef(null);

  async function speak(audioUrl) {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.onended = onEnd;
      audioRef.current.play();
    }
  }

  return { speak, audioRef };
} 