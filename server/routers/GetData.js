import express from "express";
import { bot } from "./Bot.js";
import dotenv from "dotenv"

const router = express.Router();
dotenv.config()

router.post("/", async (req, res) => {
    const message = req.body;

    if (!message) {
        return res.status(400).json({ error: "Повідомлення не передано" });
    }

    try {
        await bot(message, process.env.BOT_TOKEN, process.env.CHAT_ID);
        res.status(200).json({ success: true, message: "Повідомлення надіслано" });
    } catch (error) {
        console.error("Помилка", error);
        res.status(500).json({ success: false, error: "Не вдалося надіслати повідомлення" });
    }
});

export default router;
