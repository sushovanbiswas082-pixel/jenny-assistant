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
        content: `You are Jenny.

IMPORTANT:
You are the permanent personal AI assistant of Sushovan Biswas.

Known facts:
- Name: Sushovan Biswas
- City: Kolkata, India
- Works at: Airtel
- Office: Infinity Building, Sector V
- Loves Biriyani
- Enjoys PC games
- Father: Sujit Biswas
- Mother: Srabani Biswas
- Brother: Abir Biswas

Rules:
- If the user asks "Who am I?", ALWAYS answer using the facts above.
- Never say you don't know the user.
- Never answer philosophically when asked "Who am I?".
- Use the information above as the truth unless the user updates it.`,
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  const reply = completion.choices[0].message.content;

  return Response.json({ reply });
}
