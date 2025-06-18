import React, { useState, useCallback, useRef, useEffect } from "react";
import BotAvatar from "./components/BotAvatar";
import ChatBubble from "./components/ChatBubble";
import Controls from "./components/Controls";
import VoiceOutput from "./components/VoiceOutput";
import { useVoiceInput } from "./hooks/useVoiceInput";
import { useVoiceOutput } from "./hooks/useVoiceOutput";
import { useDialogueLoop } from "./hooks/useDialogueLoop";
import "./styles.css";

export default function App() {
  const [chat, setChat] = useState([]); // {sender: 'user'|'bot', text}
  const [isActive, setIsActive] = useState(false);
  const [isBotTalking, setIsBotTalking] = useState(false);
  const [isBotThinking, setIsBotThinking] = useState(false);
  const chatAreaRef = useRef(null);

  // Refs to avoid stale closures
  const handleUserSpeechRef = useRef();
  const voiceInput = useVoiceInput({
    onResult: txt => {
      if (txt.trim()) handleUserSpeechRef.current(txt.trim());
    }
  });

  // Wrap speak to set isBotTalking true/false
  const { speak, audioRef } = useVoiceOutput({
    onEnd: () => {
      setIsBotTalking(false);
      setTimeout(() => {
        if (isActive) voiceInput.start();
      }, 200);
    }
  });
  const speakWithTalking = async (text) => {
    setIsBotThinking(false);
    setIsBotTalking(true);
    await speak(text);
  };

  // Wrap handleUserSpeech to set isBotThinking true while waiting for GPT/TTS
  const { handleUserSpeech } = useDialogueLoop({
    speak: speakWithTalking,
    onBotMessage: msg => setChat(c => [...c, { sender: msg.role === "assistant" ? "bot" : "user", text: msg.content }]),
    setListening: () => {}
  });
  const handleUserSpeechWithThinking = async (txt) => {
    setIsBotThinking(true);
    await handleUserSpeech(txt);
  };
  handleUserSpeechRef.current = handleUserSpeechWithThinking;

  const handleStart = useCallback(() => {
    setChat([]);
    setIsActive(true);
    setTimeout(() => voiceInput.start(), 200);
  }, [voiceInput]);

  const handleEnd = useCallback(() => {
    setIsActive(false);
    voiceInput.stop();
  }, [voiceInput]);

  // Auto-scroll chat to bottom on new message
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="app-container">
      <div className="comic-header">JoeBot</div>
      {!isActive && (
        <div className="prestart-message">
          Click on <b>Start Conversation</b> and say hello.
        </div>
      )}
      <div className="main-area">
        <div className="avatar-area">
          <BotAvatar talking={isBotTalking} />
        </div>
        {isBotThinking && !isBotTalking && (
          <div className="joe-thinking-loader">
            <span className="dot">J</span>
            <span className="dot">o</span>
            <span className="dot">e</span>
            <span className="dot"> </span>
            <span className="dot">i</span>
            <span className="dot">s</span>
            <span className="dot"> </span>
            <span className="dot">t</span>
            <span className="dot">h</span>
            <span className="dot">i</span>
            <span className="dot">n</span>
            <span className="dot">k</span>
            <span className="dot">i</span>
            <span className="dot">n</span>
            <span className="dot">g</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </div>
        )}
        <div className="chat-area" ref={chatAreaRef}>
          {chat.map((msg, i) => (
            <ChatBubble key={i} text={msg.text} sender={msg.sender} />
          ))}
        </div>
        <Controls
          onStart={handleStart}
          onEnd={handleEnd}
          isActive={isActive}
        />
        {isActive && (
          <div className="network-delay-message">
            <span>Give the bot 2-3 secs to answer in speech as there will be network delay.</span>
          </div>
        )}
        <VoiceOutput ref={audioRef} />
      </div>
    </div>
  );
} 