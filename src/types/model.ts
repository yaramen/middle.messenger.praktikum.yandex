type Contact = {
    id: number
    name: string
    lastMessage: string
    time: string
    unread: number,
    avatar: string
};

type ChatMessage = {
    actor: 'contact' | 'my',
    time: string,
    messageType: 'html' | 'image',
    status?: 'send' | 'sending',
    content: string,
};

type Chat = Record<string, ChatMessage[]>;

export {
    Contact,
    ChatMessage,
    Chat,
};
