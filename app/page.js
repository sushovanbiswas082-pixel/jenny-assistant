"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message.trim()) return;
    const userMsg = message;
    setChat((prev) => [...prev, { role: "user", text: userMsg }]);
    setMessage("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg }),
    });
    const data = await res.json();
    setChat((prev) => [...prev, { role: "jenny", text: data.reply }]);
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 600, margin: "40px auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1>Jenny 2.0</h1>
      <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16, minHeight: 300, marginBottom: 16 }}>
        {chat.map((m, i) => (
          <p key={i}><strong>{m.role === "user" ? "You" : "Jenny"}:</strong> {m.text}</p>
        ))}
        {loading && <p><em>Jenny is thinking...</em></p>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{ flex: 1, padding: 10 }}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} style={{ padding: "10px 20px" }}>Send</button>
      </div>
    </main>
  );
}
