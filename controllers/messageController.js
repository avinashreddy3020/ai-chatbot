import FAQ from "../models/FAQ.js";
import { getAIReply } from "../services/aiService.js";

export const handleMessage = async (req, res) => {
  try {
    const { message } = req.body;

    const faqs = await FAQ.find();

    let reply = null;

    for (let faq of faqs) {
      if (message.toLowerCase().includes(faq.question.toLowerCase())) {
        reply = faq.answer;
        break;
      }
    }

    
    if (!reply) {
      reply = await getAIReply(
        `User asked: ${message}
         Business FAQs: ${JSON.stringify(faqs)}
         Answer based on this data if possible`
      );
    }

    res.json({ reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing message" });
  }
};
