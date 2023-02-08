import { Store } from './store/Store';
import {
    ADD_USER, AUTH, AVATAR_UPDATE, CHAT_CHANGE, CHECK_IN, PAGE_CHANGE, REMOVE_USER, PROFILE_UPDATE, PASSWORD_UPDATE,
} from './actions';
import {
    auth, checkIn, getContactList, getMessages,
} from '../api/mockApi';
import { getLinkPage, goTo, PageType } from './router';
import { ChatMessage, Contact, Profile } from '../types/model';
import { contacts, profile } from '../api/mockData';

const initState = {
    user: profile,
    contactList: contacts,
    messages: {},
    chatId: null,
    page: null,
};

type StoreType = {
    user: Profile | null,
    contactList: Contact[],
    messages: Record<string, ChatMessage[]>,
    chatId: number | null,
    page: PageType | null,
};

const store = new Store<StoreType>(initState);

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

store.addEventListener(AUTH, async ({ detail: { login, password, link } }: CustomEvent) => {
    const user = await auth(login, password);
    store.setState((state) => ({
        ...state,
        user,
    }));

    const contactList = await getContactList(user.id);

    store.setState((state) => ({
        ...state,
        contactList,
    }));

    goTo(link);
});

store.addEventListener(CHECK_IN, async ({ detail: payload }: CustomEvent) => {
    const { link, ...newUser } = payload;

    await checkIn(newUser);

    goTo(link);
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
    goTo(getLinkPage('profile'));
});

store.addEventListener(PASSWORD_UPDATE, ({ detail: data }: CustomEvent) => {
    console.log('profile update', data);
    goTo(getLinkPage('profile'));
});

export {
    store,
};
