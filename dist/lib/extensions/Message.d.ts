declare module "discord.js" {
    interface Message {
        prompt(message: Message, content: string, time?: number): Promise<Message | undefined>;
    }
}
export {};
