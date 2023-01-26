import {EventEmit} from "./event/EventEmit";

const ADD_USER = 'addUser'
const REMOVE_USER = 'removeUser'

const actions = {
    addUser: (payload) => new CustomEvent(ADD_USER, {detail: payload}),
    removeUser: (payload) => new CustomEvent(REMOVE_USER, {detail: payload})
}

const store = new EventEmit();
store.addEventListener(ADD_USER, ({detail: userName}) => {
    console.log('add user', userName)
})
store.addEventListener(REMOVE_USER, ({detail: userId}) => {
    console.log('remove user', userId)
})

export {
    actions,
    store,
}