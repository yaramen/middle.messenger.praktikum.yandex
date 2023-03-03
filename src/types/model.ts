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

// const v = {
//     id: 1,
//     user_id: 533404,
//     chat_id: 5791,
//     type: 'message',
//     time: '2023-03-01T14:38:33+00:00',
//     content: 'test',
//     is_read: true,
//     file: null,
// };

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
