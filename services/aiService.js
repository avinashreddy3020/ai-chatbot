import OpenAI from "openai";

export const getAIReply = async (message) => {

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant for a small business. Detect the user's language (English, Hindi, or Telugu) and reply in the same language. Keep responses short, clear, and friendly like a human assistant."
      },
      {
        role: "user",
        content: message
      }
    ]
  });

  return response.choices?.[0]?.message?.content.trim() 
    || "Sorry, something went wrong.";

    console.log("AI error:", error.message);
};