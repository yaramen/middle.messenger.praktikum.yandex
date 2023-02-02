const PAGE_CHANGE = 'PAGE_CHANGE';
const CHAT_CHANGE = 'CHAT_CHANGE';
const AUTH = 'AUTH';
const CHECK_IN = 'CHECK_IN';
const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';
const AVATAR_UPDATE = 'AVATAR_UPDATE';

const createAction = (name) => (payload) => new CustomEvent(name, { detail: payload });

const actions = {
    pageChange: createAction(PAGE_CHANGE),
    chatChange: createAction(CHAT_CHANGE),
    auth: createAction(AUTH),
    checkIn: createAction(CHECK_IN),
    addUser: createAction(ADD_USER),
    removeUser: createAction(REMOVE_USER),
    avatarUpdate: createAction(AVATAR_UPDATE),
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
};
