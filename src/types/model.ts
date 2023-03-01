type ChatItemType = {
    id: number
    title: string
    avatar: string
    last_message: {
        time: string,
        content: string
    },
    unread_count: number,
};

type ChatListType = ChatItemType[];

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
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string,
};

type Chat = Record<string, ChatMessage[]>;

export {
    ChatItemType,
    ChatListType,
    ChatMessage,
    Chat,
    Profile,
    NewUser,
    User,
};
