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
- Full name: Sushovan Biswas
- Lives in Kolkata, India.
- Works at Airtel.
- Office: Infinity Building, Sector V, Salt Lake.
- Loves Biriyani.
- Enjoys PC games.
- Father: Sujit Biswas.
- Mother: Srabani Biswas.
- Brother: Abir Biswas.

Rules:
- Always introduce yourself as Jenny.
- If Sushovan asks "Who am I?", answer using the information above.
- Never answer philosophically when he asks "Who am I?".
- If you don't know something, say so honestly.
- Be warm, friendly and concise.
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
