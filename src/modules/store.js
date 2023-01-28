import {EventEmit} from "./event/EventEmit";

const ADD_USER = 'addUser'
const REMOVE_USER = 'removeUser'
const AVATAR_UPDATE = 'avatarUpdate'

const actions = {
    addUser: (payload) => new CustomEvent(ADD_USER, {detail: payload}),
    removeUser: (payload) => new CustomEvent(REMOVE_USER, {detail: payload}),
    avatarUpdate: (payload) => new CustomEvent(AVATAR_UPDATE, {detail: payload})
}

const store = new EventEmit();
store.dispatch = store.dispatchEvent
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