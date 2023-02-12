const PAGE_CHANGE = 'PAGE_CHANGE';
const CHAT_CHANGE = 'CHAT_CHANGE';
const AUTH = 'AUTH';
const CHECK_IN = 'CHECK_IN';
const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';
const AVATAR_UPDATE = 'AVATAR_UPDATE';
const PROFILE_UPDATE = 'PROFILE_UPDATE';
const PASSWORD_UPDATE = 'PASSWORD_UPDATE';
const NEW_MESSAGE = 'NEW_MESSAGE';

const createAction = (name: string) => (payload: object | number | string) => new CustomEvent(name, { detail: payload });

const actions = {
    pageChange: createAction(PAGE_CHANGE),
    chatChange: createAction(CHAT_CHANGE),
    auth: createAction(AUTH),
    checkIn: createAction(CHECK_IN),
    addUser: createAction(ADD_USER),
    removeUser: createAction(REMOVE_USER),
    avatarUpdate: createAction(AVATAR_UPDATE),
    profileUpdate: createAction(PROFILE_UPDATE),
    passwordUpdate: createAction(PASSWORD_UPDATE),
    newMessage: createAction(NEW_MESSAGE),
};

export {
    actions,
    PAGE_CHANGE,
    CHAT_CHANGE,
    AUTH,
    CHECK_IN,
    ADD_USER,
    REMOVE_USER,
    AVATAR_UPDATE,
    PROFILE_UPDATE,
    PASSWORD_UPDATE,
    NEW_MESSAGE,
};
