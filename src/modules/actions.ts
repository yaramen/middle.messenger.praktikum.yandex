const INIT_ACTION = 'INIT_ACTION';
const INIT_MESSAGE_PAGE = 'INIT_MESSAGE_PAGE';
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
const LOGOUT = 'LOGOUT';
const REMOVE_CHAT = 'REMOVE_CHAT';
const ADD_CHAT = 'ADD_CHAT';
const RESPONSE_MESSAGE_LIST = 'RESPONSE_MESSAGE_LIST';
const RESPONSE_MESSAGE = 'RESPONSE_MESSAGE';
const FORCE = 'FORCE';
const SEND_FILE = 'SEND_FILE';

const createAction = (name: string) => (payload: object | number | string) => new CustomEvent(name, { detail: payload });

const actions = {
    initAction: createAction(INIT_ACTION),
    initMessagePage: createAction(INIT_MESSAGE_PAGE),
    pageChange: createAction(PAGE_CHANGE),
    chatChange: createAction(CHAT_CHANGE),
    auth: createAction(AUTH),
    checkIn: createAction(CHECK_IN),
    addUser: createAction(ADD_USER),
    addChat: createAction(ADD_CHAT),
    removeUser: createAction(REMOVE_USER),
    removeChat: createAction(REMOVE_CHAT),
    avatarUpdate: createAction(AVATAR_UPDATE),
    profileUpdate: createAction(PROFILE_UPDATE),
    passwordUpdate: createAction(PASSWORD_UPDATE),
    newMessage: createAction(NEW_MESSAGE),
    logout: createAction(LOGOUT),
    responseMessageList: createAction(RESPONSE_MESSAGE_LIST),
    responseMessage: createAction(RESPONSE_MESSAGE),
    force: createAction(FORCE),
    sendFile: createAction(SEND_FILE),
};

export {
    actions,
    INIT_ACTION,
    INIT_MESSAGE_PAGE,
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
    LOGOUT,
    REMOVE_CHAT,
    ADD_CHAT,
    RESPONSE_MESSAGE_LIST,
    RESPONSE_MESSAGE,
    FORCE,
    SEND_FILE,
};
