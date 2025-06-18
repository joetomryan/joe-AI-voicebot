import { useState, useCallback } from "react";
import { fetchGptResponse } from "../api/gptApi";

export function useDialogueLoop({ speak, onBotMessage, setListening }) {
  const [messages, setMessages] = useState([]);

  const handleUserSpeech = useCallback(async (userText) => {
    setMessages(msgs => [...msgs, { role: "user", content: userText }]);
    onBotMessage({ role: "user", content: userText });
    setListening(false);
    const botText = await fetchGptResponse([...messages, { role: "user", content: userText }]);
    setMessages(msgs => [...msgs, { role: "assistant", content: botText }]);
    onBotMessage({ role: "assistant", content: botText });
    await speak(botText);
    setListening(true);
  }, [messages, speak, onBotMessage, setListening]);

  return { handleUserSpeech };
} 