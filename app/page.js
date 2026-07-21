async function sendMessage() {
  if (!message.trim()) return;

  const userMsg = message;
  setChat((prev) => [...prev, { role: "user", text: userMsg }]);
  setMessage("");
  setLoading(true);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMsg }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Server Error");
    }

    setChat((prev) => [
      ...prev,
      { role: "jenny", text: data.reply },
    ]);
  } catch (error) {
    setChat((prev) => [
      ...prev,
      {
        role: "jenny",
        text: "❌ " + error.message,
      },
    ]);
  } finally {
    setLoading(false);
  }
}
