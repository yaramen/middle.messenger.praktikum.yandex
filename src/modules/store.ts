import { Store } from './store/Store';
import {
    ADD_USER,
    AUTH,
    AVATAR_UPDATE,
    CHAT_CHANGE,
    CHECK_IN,
    INIT_ACTION,
    LOGOUT,
    NEW_MESSAGE,
    PAGE_CHANGE,
    PASSWORD_UPDATE,
    PROFILE_UPDATE,
    REMOVE_USER,
} from './actions';
import { getMessages } from '../api/mockApi';
import { getLinkPage, goTo, PageType } from './router';
import { ChatMessage, Contact, User } from '../types/model';
import { contacts } from '../api/mockData';
import { AuthService } from '../api/AuthApi';
import { showMessage } from './messageBox';

const initState = {
    isInit: false,
    user: null,
    contactList: contacts,
    messages: {},
    chatId: null,
    page: null,
};

type StoreType = {
    isInit: boolean,
    user: User | null,
    contactList: Contact[],
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
        goTo(getLinkPage('messenger'));
    } catch (e) {
        store.setState((state) => ({
            ...state,
            isInit: true,
        }));
        goTo(getLinkPage('auth'));
    }
});

store.addEventListener(PAGE_CHANGE, ({ detail: page }: CustomEvent) => {
    store.setState((state) => ({
        ...state,
        page,
    }));
});

store.addEventListener(CHAT_CHANGE, async ({ detail: chatId }: CustomEvent) => {
    const messages = await getMessages(chatId);
    store.setState((state) => ({
        ...state,
        chatId,
        messages,
    }));
});

store.addEventListener(AUTH, async ({ detail: payload }: CustomEvent) => {
    const { link, login, password } = payload; 3;
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

store.addEventListener(AVATAR_UPDATE, ({ detail: userId }: CustomEvent) => {
    console.log('avatar update', userId);
});

store.addEventListener(PROFILE_UPDATE, ({ detail: data }: CustomEvent) => {
    console.log('profile update', data);
    goTo(getLinkPage('settings'));
});

store.addEventListener(PASSWORD_UPDATE, ({ detail: data }: CustomEvent) => {
    console.log('profile update', data);
    goTo(getLinkPage('settings'));
});

store.addEventListener(NEW_MESSAGE, ({ detail: data }: CustomEvent) => {
    console.log('new message: ', data);
});

store.addEventListener(LOGOUT, async () => {
    await AuthService.logout();
    goTo(getLinkPage('auth'));
});

export {
    store,
};
