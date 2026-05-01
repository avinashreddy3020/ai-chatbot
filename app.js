import express from "express";
import cors from "cors";
import twilio from "twilio";
import FAQ from "./models/FAQ.js";
// import { getAIReply } from "./services/aiService.js"; // ❌ AI disabled

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Debug
app.use((req, res, next) => {
  console.log("🔥 REQUEST HIT:", req.method, req.url);
  next();
});

app.post("/webhook", async (req, res) => {
  try {
    const incomingMsg = req.body.Body || "";

    console.log("📩 MESSAGE:", incomingMsg);

    let reply = null;

    try {
      const faqs = await FAQ.find();

      for (let faq of faqs) {
        if (
          faq.question
            .toLowerCase()
            .split(" ")
            .some(word => incomingMsg.toLowerCase().includes(word))
        ) {
          reply = faq.answer;
          break;
        }
      }

      // ❌ AI disabled — fallback only
      if (!reply) {
        reply = "Sorry, I didn’t understand. Please contact us 😊";
      }

    } catch (err) {
      console.error("⚠️ DB error:", err.message);
      reply = "Server busy, please try again later 🙏";
    }

    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message(reply);

    res.type("text/xml").send(twiml.toString());

  } catch (error) {
    console.error("❌ FATAL ERROR:", error);
    res.status(200).send("<Response><Message>Server error</Message></Response>");
  }
});

export default app;