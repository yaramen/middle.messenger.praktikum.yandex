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

type Profile = {
    email: string,
    login: string,
    firstName: string,
    fastName: string,
    nickName: string,
    phone: string,
    password: string,
    avatar: string,
};

type Chat = Record<string, ChatMessage[]>;

export {
    Contact,
    ChatMessage,
    Chat,
    Profile,
};
