type ChatItemType = {
    id: number
    title: string
    avatar: string
    last_message: {
        time: string,
        content: string
        user: {
            avatar: string,
        }
    },
    unread_count: number,
};

type ChatListType = ChatItemType[];

type ChatMessage = {
    id: number,
    user_id: number,
    actor: 'contact' | 'my',
    time: string,
    type: 'message' | 'file',
    is_read: true,
    content: string,
    file?: {
        id: string,
        path: string,
        filename: string,
        content_type: string
    }
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

export {
    ChatItemType,
    ChatListType,
    ChatMessage,
    NewUser,
    User,
};
