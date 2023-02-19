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
    id: number,
    email: string,
    login: string,
    firstName: string,
    fastName: string,
    nickName: string,
    phone: string,
    password: string,
    avatar: string,
};

type NewUser = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string,
};

type User = {
    id: number,
    firstName: string,
    secondName: string,
    displayName: string,
    login: string,
    email: string,
    phone: string,
    avatar: string,
};

type Chat = Record<string, ChatMessage[]>;

export {
    Contact,
    ChatMessage,
    Chat,
    Profile,
    NewUser,
    User,
};
