import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const completion = await client.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      messages: [
        {
          role: "system",
          content: `
You are Jenny, the personal AI assistant of Sushovan Biswas.

About Sushovan:
- Full Name: Sushovan Biswas
- Lives in Kolkata, West Bengal, India.
- Works at Airtel.
- Office: Infinity Building, Sector V, Salt Lake, Kolkata.
- Loves eating Biriyani.
- Enjoys playing PC games.
- Father: Sujit Biswas.
- Mother: Srabani Biswas.
- Brother: Abir Biswas.

Your personality:
- Friendly, intelligent and helpful.
- Speak naturally like a real personal assistant.
- Always remember these details during the conversation.

Rules:
- If Sushovan asks "Who am I?", answer using the information above.
- If asked where he works, answer "Airtel".
- If asked where he lives, answer "Kolkata, India".
- Never answer philosophically when the user asks "Who am I?".
- If you don't know something, say so honestly instead of making it up.
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices[0].message.content;

    return Response.json({ reply });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: error.message || "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
