import {EventEmit} from "./event/EventEmit";
import {auth, checkIn, getContactList} from "../api/mockApi";
import {goTo} from "../router";

const createAction = (name) => (payload) => new CustomEvent(name, {detail: payload})

const AUTH = 'AUTH'
const CHECK_IN = 'checkIn'
const ADD_USER = 'addUser'
const REMOVE_USER = 'removeUser'
const AVATAR_UPDATE = 'avatarUpdate'

const actions = {
    auth: createAction(AUTH),
    checkIn: createAction(CHECK_IN),
    addUser: createAction(ADD_USER),
    removeUser: createAction(REMOVE_USER),
    avatarUpdate: createAction(AVATAR_UPDATE)
}

const state = {
    user: null,
    contactList: [],
    messages: []
}

const store = new EventEmit();
store.dispatch = store.dispatchEvent
store.getState = () => state

store.addEventListener(AUTH, async ({detail: {login, password, link}}) => {
    const user = await auth(login, password)
    state.user = {...user};

    const contactList = await getContactList(user.id)
    state.contactList = [...contactList];

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