import { Store } from './store/Store';
import {
    actions,
    ADD_CHAT,
    ADD_USER,
    AUTH,
    AVATAR_UPDATE,
    CHAT_CHANGE,
    CHECK_IN,
    FORCE,
    INIT_ACTION,
    INIT_MESSAGE_PAGE,
    LOGOUT,
    NEW_MESSAGE,
    PAGE_CHANGE,
    PASSWORD_UPDATE,
    PROFILE_UPDATE,
    REMOVE_CHAT,
    REMOVE_USER,
    RESPONSE_MESSAGE,
    RESPONSE_MESSAGE_LIST,
    SEND_FILE,
} from './actions';
import {
    getActiveRoute, getLinkPage, goTo, PageType,
} from './router';
import { ChatListType, ChatMessage, User } from '../types/model';
import { AuthService } from '../api/AuthService';
import { showMessage } from './messageBox';
import { ChatService } from '../api/ChatService';
import { UserService } from '../api/UserService';
import { WebSocketService } from '../api/WebSocketService';

const initState = {
    isInit: false,
    isLoading: false,
    user: null,
    chatList: [],
    messages: [],
    chatId: null,
    page: null,
    force: false,
};

type StoreType = {
    isInit: boolean,
    isLoading: boolean,
    user: User | null,
    chatList: ChatListType,
    messages: ChatMessage[],
    chatId: number | null,
    page: PageType | null,
    force: boolean,
};

const store = new Store<StoreType>(initState);

store.addEventListener(INIT_ACTION, async () => {
    try {
        const user = await AuthService.user();
        store.setState((state) => ({
            ...state,
            user,
            isInit: true,
        }));
        const currentPage = getActiveRoute().page;
        if (currentPage === 'auth' || !currentPage) {
            goTo(getLinkPage('messenger'));
        }
    } catch (e) {
        store.setState((state) => ({
            ...state,
            isInit: true,
        }));
        goTo(getLinkPage('auth'));
    }
});

store.addEventListener(INIT_MESSAGE_PAGE, async () => {
    store.setState((state) => ({
        ...state,
        isLoading: true,
    }));

    const chatList = await ChatService.chatList();

    store.setState((state) => ({
        ...state,
        chatList,
        isLoading: false,
    }));
});

store.addEventListener(FORCE, async () => {
    store.setState((state) => ({
        ...state,
        force: !state.force,
    }));
});

store.addEventListener(PAGE_CHANGE, ({ detail: page }: CustomEvent) => {
    store.setState((state) => ({
        ...state,
        page,
    }));
});

store.addEventListener(CHAT_CHANGE, async ({ detail: chatId }: CustomEvent) => {
    if (store.getState().chatId === chatId) {
        return;
    }
    store.setState((state) => ({
        ...state,
        chatId,
        messages: [],
    }));
});

store.addEventListener(RESPONSE_MESSAGE_LIST, async ({ detail: messageList }: CustomEvent) => {
    const newMessages = (messageList as ChatMessage[]).map((v) => ({
        ...v,
        actor: v.user_id === store.getState().user?.id ? 'my' : 'contact',
    })) as ChatMessage[];
    newMessages.reverse();

    store.setState((state) => ({
        ...state,
        messages: [...newMessages, ...state.messages],
    }));
});

store.addEventListener(RESPONSE_MESSAGE, async ({ detail: message }: CustomEvent) => {
    store.setState((state) => ({
        ...state,
        messages: [...state.messages, {
            ...message,
            actor: message.user_id === store.getState().user?.id ? 'my' : 'contact',
        }],
    }));
});

store.addEventListener(SEND_FILE, async ({ detail: file }: CustomEvent) => {
    const { id } = await ChatService.sendResource(file);
    WebSocketService.getInstance()?.sendFile(id.toString());
});

store.addEventListener(AUTH, async ({ detail: payload }: CustomEvent) => {
    const { link, login, password } = payload;

    try {
        await AuthService.login(login, password);
        const user = await AuthService.user();

        store.setState((state) => ({
            ...state,
            user,
        }));

        goTo(link);
    } catch (xhr) {
        showMessage(JSON.parse(xhr.responseText).reason);
    }
});

store.addEventListener(CHECK_IN, async ({ detail: payload }: CustomEvent) => {
    const { link, ...newUser } = payload;

    try {
        await AuthService.signup(newUser);

        const user = await AuthService.user();
        store.setState((state) => ({
            ...state,
            user,
        }));

        goTo(link);
    } catch (xhr) {
        showMessage(JSON.parse(xhr.responseText).reason);
    }
});

store.addEventListener(ADD_USER, async ({ detail: userName }: CustomEvent) => {
    const userList = await UserService.search(userName);
    const user = userList.find((user) => user.login === userName);

    if (!user) {
        showMessage('Пользователь не найден');
        return;
    }

    const { chatId } = store.getState();
    if (!chatId) {
        showMessage('Чат не выбран');
        return;
    }
    await ChatService.addUser(chatId, user.id);
});

store.addEventListener(REMOVE_USER, async ({ detail: { userId, chatId } }: CustomEvent) => {
    await ChatService.removeUser(chatId, userId);
});

store.addEventListener(NEW_MESSAGE, ({ detail: message }: CustomEvent) => {
    WebSocketService.getInstance()?.sendMessage(message);
});

store.addEventListener(AVATAR_UPDATE, async ({ detail: file }: CustomEvent) => {
    const user = await UserService.updateAvatar(file);

    store.setState((state) => ({
        ...state,
        user,
    }));
    store.dispatch(actions.force({}));
});

store.addEventListener(PROFILE_UPDATE, async ({ detail: data }: CustomEvent) => {
    await UserService.updateProfile(data);
    goTo(getLinkPage('settings'));
});

store.addEventListener(PASSWORD_UPDATE, async ({ detail: data }: CustomEvent) => {
    await UserService.updatePassword(data);
    goTo(getLinkPage('settings'));
});

store.addEventListener(LOGOUT, async () => {
    await AuthService.logout();
    goTo(getLinkPage('auth'));
});

store.addEventListener(REMOVE_CHAT, async ({ detail: chatId }: CustomEvent) => {
    await ChatService.removeChat(chatId);
    store.setState((state) => {
        const newChatList = state.chatList.filter((chat) => chat.id !== chatId);
        return {
            ...state,
            chatId: newChatList[0].id || null,
            chatList: newChatList,
        };
    });
});

store.addEventListener(ADD_CHAT, async ({ detail: title }: CustomEvent) => {
    await ChatService.createChat(title);
    const chatList = await ChatService.chatList();

    store.setState((state) => ({
        ...state,
        chatList,
    }));

    store.dispatch(actions.force({}));
});

export {
    store,
};
