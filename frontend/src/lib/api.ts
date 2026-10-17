// Chat API client — talks to the FastAPI backend (see backend/main.py).
// Later: swap the backend stub for a real LLM provider; the frontend
// contract stays the same.

export interface ChatMsg {
  role: 'user' | 'assistant'
  content: string
}

export async function sendChat(message: string, history: ChatMsg[]): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  })
  if (!res.ok) {
    throw new Error(`chat API returned ${res.status}`)
  }
  const data: { reply: string } = await res.json()
  return data.reply
}
