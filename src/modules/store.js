import {auth, checkIn, getContactList} from "../api/mockApi";
import {goTo} from "./router";
import {Store} from "./store/Store";

const createAction = (name) => (payload) => new CustomEvent(name, {detail: payload})

const PAGE_CHANGE = 'PAGE_CHANGE'
const CHAT_CHANGE = 'CHAT_CHANGE'
const AUTH = 'AUTH'
const CHECK_IN = 'CHECK_IN'
const ADD_USER = 'ADD_USER'
const REMOVE_USER = 'REMOVE_USER'
const AVATAR_UPDATE = 'AVATAR_UPDATE'

const actions = {
    pageChange: createAction(PAGE_CHANGE),
    chatChange: createAction(CHAT_CHANGE),
    auth: createAction(AUTH),
    checkIn: createAction(CHECK_IN),
    addUser: createAction(ADD_USER),
    removeUser: createAction(REMOVE_USER),
    avatarUpdate: createAction(AVATAR_UPDATE)
}

const initState = {
    user: null,
    contactList: [],
    messages: [],
    chatId: null,
    page: null,
}

const store = new Store(initState);

store.addEventListener(PAGE_CHANGE, ({detail: page}) => {
    store.setState(state => ({
        ...state,
        page,
    }))
})

store.addEventListener(CHAT_CHANGE, ({detail: chatId}) => {
    store.setState(state => ({
        ...state,
        chatId,
    }))
})

store.addEventListener(AUTH, async ({detail: {login, password, link}}) => {
    const user = await auth(login, password)
    store.setState(state => ({
        ...state,
        user,
    }));

    const contactList = await getContactList(user.id)

    store.setState(state => ({
        ...state,
        contactList
    }))

    goTo(link)
})

store.addEventListener(CHECK_IN, async ({detail: payload}) => {
    const {link, ...newUser} = payload;

    const result = await checkIn(newUser);

    goTo(link)
})

store.addEventListener(ADD_USER, ({detail: userName}) => {
    console.log('add user', userName)
})
store.addEventListener(REMOVE_USER, ({detail: userId}) => {
    console.log('remove user', userId)
})
store.addEventListener(AVATAR_UPDATE, ({detail: userId}) => {
    console.log('avatar update', userId)
})

export {
    actions,
    store,
}