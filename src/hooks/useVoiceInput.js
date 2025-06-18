import { useRef, useEffect } from "react";

export function useVoiceInput({ onResult }) {
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) return;
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(r => r[0].transcript)
        .join('');
      onResult(transcript);
    };
    recognitionRef.current = recognition;
    return () => recognition && recognition.stop();
  }, [onResult]);

  return {
    start: () => recognitionRef.current && recognitionRef.current.start(),
    stop: () => recognitionRef.current && recognitionRef.current.stop(),
  };
} 