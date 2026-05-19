import { Bot } from "grammy";

type arguments = {
    data: string;
    token: string;
    id: string;
}

export async function bot({data, token, id}: arguments) {
    const bot = new Bot(token);
    await bot.api.sendMessage(id, data);

    return { success: true };
}
