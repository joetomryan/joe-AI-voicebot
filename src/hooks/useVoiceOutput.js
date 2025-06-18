import { useRef } from "react";

export function useVoiceOutput({ onEnd }) {
  const audioRef = useRef(null);

  async function speak(text) {
    const apiKey = process.env.REACT_APP_ELEVENLABS_API_KEY;
    const voiceId = process.env.REACT_APP_ELEVENLABS_VOICE_ID; // Your cloned voice ID
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.5, similarity_boost: 0.8 }
      }),
    });
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.onended = onEnd;
      audioRef.current.play();
    }
  }

  return { speak, audioRef };
} 