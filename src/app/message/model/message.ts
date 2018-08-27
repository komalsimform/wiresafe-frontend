export class Message {
    id: string;
    // type: Message.TypeEnum;
    channelId: string;
    timestamp: number;
    sender?: string;
    content: string;
}
