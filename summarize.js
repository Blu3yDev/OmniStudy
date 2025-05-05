import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async (req, res) => {
  const { text, action, grade, simplicity } = req.body;

  const prompt = `
  You are an educational assistant. Given the text below, perform the following action: ${action}.
  Target Audience: Grade ${grade}, Simplicity: ${simplicity}.
  
  Text:
  "${text}"
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
      max_tokens: 300,
    });

    const responseText = completion.choices[0].message.content.trim();
    res.status(200).json({ data: responseText });

  } catch (error) {
    res.status(500).json({ error: "AI request failed." });
  }
};
