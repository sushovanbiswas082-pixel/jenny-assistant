import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req) {
  const { message } = await req.json();

  const completion = await client.chat.completions.create({
    model: "qwen/qwen3-coder:free",
    messages: [{ role: "user", content: message }],
  });

  const reply = completion.choices[0].message.content;
  return Response.json({ reply });
}
