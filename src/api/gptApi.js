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
  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  // Optionally, you can return the text if you want to display it, but with this backend, only audio is returned.
  return { audioUrl, text: null };
} 