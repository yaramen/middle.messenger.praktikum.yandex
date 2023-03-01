import { Store } from './store/Store';
import {
    ADD_CHAT,
    ADD_USER,
    AUTH,
    AVATAR_UPDATE,
    CHAT_CHANGE,
    CHECK_IN,
    INIT_ACTION,
    INIT_MESSAGE_PAGE,
    LOGOUT,
    NEW_MESSAGE,
    PAGE_CHANGE,
    PASSWORD_UPDATE,
    PROFILE_UPDATE,
    REMOVE_CHAT,
    REMOVE_USER,
} from './actions';
import { getMessages } from '../api/mockApi';
import {
    getActiveRoute, getLinkPage, goTo, PageType,
} from './router';
import { ChatListType, ChatMessage, User } from '../types/model';
import { AuthService } from '../api/AuthService';
import { showMessage } from './messageBox';
import { ChatService } from '../api/ChatService';
import { UserService } from '../api/UserService';

const initState = {
    isInit: false,
    isLoading: false,
    user: null,
    chatList: [],
    messages: {},
    chatId: null,
    page: null,
};

type StoreType = {
    isInit: boolean,
    isLoading: boolean,
    user: User | null,
    chatList: ChatListType,
    messages: Record<string, ChatMessage[]>,
    chatId: number | null,
    page: PageType | null,
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
        if (currentPage === 'auth') {
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

store.addEventListener(PAGE_CHANGE, ({ detail: page }: CustomEvent) => {
    store.setState((state) => ({
        ...state,
        page,
    }));
});

store.addEventListener(CHAT_CHANGE, async ({ detail: chatId }: CustomEvent) => {
    // const messages = await getMessages(chatId);

    store.setState((state) => ({
        ...state,
        chatId,
        messages: {},
    }));
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

store.addEventListener(ADD_USER, ({ detail: userName }: CustomEvent) => {
    console.log('add user', userName);
});

store.addEventListener(REMOVE_USER, ({ detail: userId }: CustomEvent) => {
    console.log('remove user', userId);
});

store.addEventListener(NEW_MESSAGE, ({ detail: data }: CustomEvent) => {
    console.log('new message: ', data);
});

store.addEventListener(AVATAR_UPDATE, async ({ detail: file }: CustomEvent) => {
    const { avatar } = await UserService.updateAvatar(file);

    store.setState((state) => ({
        ...state,
        user: {
            ...state.user as User,
            avatar,
        },
    }));
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
});

export {
    store,
};
