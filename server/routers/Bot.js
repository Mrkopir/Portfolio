import { Bot } from "grammy";

export async function bot(data, token, id) {
    const bot = new Bot(token);
    await bot.api.sendMessage(id, data);

    return { success: true };
}
