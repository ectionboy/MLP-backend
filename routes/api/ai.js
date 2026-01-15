import express from "express";
import { OpenRouter } from "@openrouter/sdk";

const router = express.Router();

const openrouter = new OpenRouter({
  apiKey: process.env.API_KEY,
});

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // 🔒 базова валідація
    if (!message) {
      return res.status(400).json({ error: "message is required" });
    }

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
  
    const stream = await openrouter.chat.send({
      model: "deepseek/deepseek-r1-0528:free",
      messages: [{ role: "user", content: message }],
      stream: true,
    });
  
    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) res.write(content);
    }
  

    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
});

export default router;
