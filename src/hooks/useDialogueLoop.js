import { useState, useCallback } from "react";
import { fetchGptResponse } from "../api/gptApi";

export function useDialogueLoop({ speak, onBotMessage, setListening }) {
  const [messages, setMessages] = useState([]);

  const handleUserSpeech = useCallback(async (userText) => {
    setMessages(msgs => [...msgs, { role: "user", content: userText }]);
    onBotMessage({ role: "user", content: userText });
    setListening(false);
    const { audioUrl, text } = await fetchGptResponse([...messages, { role: "user", content: userText }]);
    if (text) {
      setMessages(msgs => [...msgs, { role: "assistant", content: text }]);
      onBotMessage({ role: "assistant", content: text });
    }
    await speak(audioUrl);
    setListening(true);
  }, [messages, speak, onBotMessage, setListening]);

  return { handleUserSpeech };
} 