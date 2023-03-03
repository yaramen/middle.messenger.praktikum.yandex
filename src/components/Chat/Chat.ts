import { Avatar } from '../Avatar';
import { Popover } from '../Popover';
import { ActionList } from '../ActionList';
import { NewMessage } from '../NewMessage';
import { usePopup } from '../../modules/popup';
import { Popup } from '../Popup';
import { PromptPopup } from '../PromptPopup';
import styles from './Chat.css';
import addIcon from '../../icons/add.svg';
import deleteIcon from '../../icons/delete.svg';
import deleteChatIcon from '../../icons/delete-chat.svg';
import dotsIcon from '../../icons/dots.svg';
import { createComponent, createElement, createText } from '../../modules/vdom/createElement';
import { store } from '../../modules/store';
import { ChatItemType, User } from '../../types/model';
import { ConfirmPopup } from '../ConfirmPopup';
import { actions } from '../../modules/actions';
import { WebSocketService } from '../../api/WebSocketService';
import { MessageList } from '../MessageList';
import { RemoveUserChat } from '../RemoveUserChat';

function Chat() {
    const [chat, setChat] = this.useState(null);
    const [messages, setMessages] = this.useState([]);
    const [ws, setWs] = this.useState(null);

    this.useEffectOnce(() => {
        const unsubscribe = store.subscribe(((oldState, newState) => {
            if (oldState.chatId !== newState.chatId) {
                const activeChat = newState.chatList.find((v) => v.id === newState.chatId);
                setChat(activeChat);
                if (activeChat && activeChat.id) {
                    ws() && ws().disconnect();
                    setWs(WebSocketService.createInstance((store.getState().user as User).id, activeChat.id));
                }
            }
            if (oldState.messages !== newState.messages) {
                setMessages(newState.messages);
            }
        }));

        return () => {
            ws() && ws().disconnect();
            unsubscribe();
        };
    });

    if (!chat()) {
        return createElement(
            'div',
            { className: styles.empty },
            createText('Выберите чат, чтобы отправить сообщение'),
        );
    }

    const { avatar, title, id } = (chat() as ChatItemType);

    const popupAdd = usePopup(createComponent(Popup, {
        key: 'popup',
        title: 'Добавить пользователя',
        content: createComponent(PromptPopup, {
            key: 'addUser',
            closePopup: () => popupAdd.close(),
            send: (name) => store.dispatch((actions.addUser(name))),
        }),
        close: () => popupAdd.close(),
    }));

    const popupRemoveUser = usePopup(createComponent(Popup, {
        key: 'popup',
        title: 'Удалить пользователя',
        content: createComponent(RemoveUserChat, {
            key: 'remove',
            id,
            closePopup: () => popupRemoveUser.close(),
        }),
        close: () => popupRemoveUser.close(),
    }));

    const popupRemoveChat = usePopup(createComponent(Popup, {
        key: 'popup',
        title: 'Удалить чат',
        content: createComponent(ConfirmPopup, {
            key: 'remove-chat',
            id,
            closePopup: () => popupRemoveChat.close(),
            confirm: () => store.dispatch(actions.removeChat(chat().id)),
        }),
        close: () => popupRemoveChat.close(),
    }));

    const actionPopover = createComponent(
        Popover,
        {
            key: 'popover',
            target: createElement(
                'img',
                {
                    className: styles.dots,
                    src: dotsIcon,
                    alt: 'more',
                },
            ),
            content: createComponent(
                ActionList,
                {
                    key: 'action-list',
                    actions: [{
                        key: 'add',
                        icon: addIcon,
                        label: 'Добавить пользователя',
                        click: () => popupAdd.show(),
                    }, {
                        key: 'delete-users',
                        icon: deleteIcon,
                        label: 'Удалить пользователя',
                        click: () => popupRemoveUser.show(),
                    }, {
                        key: 'delete-chat',
                        icon: deleteChatIcon,
                        label: 'Удалить чат',
                        click: () => popupRemoveChat.show(),
                    }],
                },
            ),
            offset: {
                x: 0,
                y: 16,
            },
        },
    );

    return createElement(
        'div',
        { className: styles.chat },
        createElement(
            'div',
            { className: styles.header },
            createElement(
                'div',
                { className: styles['header-content'] },
                createElement(
                    'div',
                    { className: styles.avatar },
                    createComponent(
                        Avatar,
                        {
                            key: 'avatar',
                            image: avatar,
                            name: chat.title,
                        },
                    ),
                ),
                createElement(
                    'div',
                    { className: styles.name },
                    createText(title),
                ),
                createElement(
                    'div',
                    { className: styles.action },
                    actionPopover,
                ),
            ),
        ),
        createElement(
            'div',
            { className: styles.content },
            createComponent(
                MessageList,
                {
                    key: 'messages',
                    messages: messages(),
                },
            ),
        ),
        createElement(
            'div',
            {
                className: styles['new-message'],
            },
            createComponent(
                NewMessage,
                {
                    key: 'message',
                },
            ),
        ),
    );
}

export {
    Chat,
};
