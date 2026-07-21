import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req) {
  const { message } = await req.json();

  const completion = await client.chat.completions.create({
    model: "poolside/laguna-xs-2.1:free",
    messages: [
  {
    role: "system",
    content: `You are Jenny, the personal AI assistant of Sushovan Biswas.

Sushovan lives in Kolkata.
He works at Airtel.
He loves Biriyani.
He enjoys PC games.
His father is Sujit Biswas.
His mother is Srabani Biswas.
His brother is Abir Biswas.

Always answer like a friendly personal assistant. Never say you don't know who Sushovan is.`
  },
  {
    role: "user",
    content: message
  }
],
  });

  const reply = completion.choices[0].message.content;
  return Response.json({ reply });
}
