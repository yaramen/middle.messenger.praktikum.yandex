import { Store } from './store/Store';
import {
    ADD_USER, AUTH, AVATAR_UPDATE, CHAT_CHANGE, CHECK_IN, PAGE_CHANGE, REMOVE_USER,
} from './actions';
import { auth, checkIn, getContactList } from '../api/mockApi';
// eslint-disable-next-line import/no-cycle
import { goTo } from './router';

const initState = {
    user: null,
    contactList: [],
    messages: [],
    chatId: null,
    page: null,
};

const store = new Store(initState);

store.addEventListener(PAGE_CHANGE, ({ detail: page }: CustomEvent) => {
    store.setState((state) => ({
        ...state,
        page,
    }));
});

store.addEventListener(CHAT_CHANGE, ({ detail: chatId }: CustomEvent) => {
    store.setState((state) => ({
        ...state,
        chatId,
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
    // eslint-disable-next-line no-console
    console.log('add user', userName);
});

store.addEventListener(REMOVE_USER, ({ detail: userId }: CustomEvent) => {
    // eslint-disable-next-line no-console
    console.log('remove user', userId);
});

store.addEventListener(AVATAR_UPDATE, ({ detail: userId }: CustomEvent) => {
    // eslint-disable-next-line no-console
    console.log('avatar update', userId);
});

export {
    store,
};
