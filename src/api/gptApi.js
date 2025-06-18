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

  // Parse multipart/x-mixed-replace
  const boundaryMatch = response.headers.get('content-type').match(/boundary=(.*)$/);
  const boundary = boundaryMatch ? boundaryMatch[1] : null;
  if (!boundary) {
    return { audioUrl: null, text: null };
  }

  const reader = response.body.getReader();
  let buffer = '';
  let audioChunks = [];
  let text = '';
  let isAudio = false;
  let isJson = false;
  let jsonBuffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = new TextDecoder().decode(value);
    buffer += chunk;
    while (true) {
      const boundaryIdx = buffer.indexOf(`--${boundary}`);
      if (boundaryIdx === -1) break;
      const part = buffer.slice(0, boundaryIdx);
      buffer = buffer.slice(boundaryIdx + boundary.length + 2);
      if (part.trim() === '' || part.trim() === '--') continue;
      // Parse headers
      const headerEnd = part.indexOf('\r\n\r\n');
      if (headerEnd === -1) continue;
      const headers = part.slice(0, headerEnd).toLowerCase();
      const body = part.slice(headerEnd + 4);
      if (headers.includes('content-type: audio/mpeg')) {
        // Audio chunk
        const audioBinary = Uint8Array.from(body, c => c.charCodeAt(0));
        audioChunks.push(audioBinary);
      } else if (headers.includes('content-type: application/json')) {
        // JSON part
        try {
          const jsonStart = body.indexOf('{');
          const jsonEnd = body.lastIndexOf('}');
          if (jsonStart !== -1 && jsonEnd !== -1) {
            text = JSON.parse(body.slice(jsonStart, jsonEnd + 1)).text;
          }
        } catch (e) {
          text = '';
        }
      }
    }
  }
  // Merge audio chunks
  const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
  const audioUrl = URL.createObjectURL(audioBlob);
  return { audioUrl, text };
} 