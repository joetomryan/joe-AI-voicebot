export async function fetchGptResponse(messages) {
  // Send only the latest user message to the backend
  const response = await fetch("/api/gpt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: messages[messages.length - 1].content }),
  });
  if (!response.ok) {
    return { audioUrl: null, text: null };
  }
  const { text, audio } = await response.json();
  // Convert base64 to Blob URL
  const audioBlob = new Blob([Uint8Array.from(atob(audio), c => c.charCodeAt(0))], { type: "audio/mpeg" });
  const audioUrl = URL.createObjectURL(audioBlob);
  return { audioUrl, text };
} 