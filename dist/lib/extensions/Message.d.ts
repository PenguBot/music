declare module "discord.js" {
    interface Message {
        prompt(content: string, time?: number): Promise<Message | undefined>;
    }
}
export {};
