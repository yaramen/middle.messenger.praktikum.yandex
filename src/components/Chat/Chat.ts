import { Avatar } from '../Avatar';
import { Popover } from '../Popover';
import { ActionList } from '../ActionList';
import { NewMessage } from '../NewMessage';
import { MessageList } from '../MessageList';
import { usePopup } from '../../modules/popup';
import { Popup } from '../Popup';
import { AddUserPopup } from '../AddUserPopup';
import styles from './Chat.css';
import addIcon from '../../icons/add.svg';
import deleteIcon from '../../icons/delete.svg';
import dotsIcon from '../../icons/dots.svg';
import { createComponent, createElement, createText } from '../../modules/vdom/createElement';
import { store } from '../../modules/store';
import { Contact } from '../../types/model';
import { RemoveUserPopup } from '../RemoveUserPopup';

function Chat() {
    const [chat, setChat] = this.useState(null);
    const [messages, setMessages] = this.useState(null);

    this.useEffectOnce(() => {
        const unsubscribe = store.subscribe((oldState, newState) => {
            if (oldState.chatId !== newState.chatId) {
                setChat(newState.contactList.find((v) => v.id === newState.chatId));
                setMessages(newState.messages);
            }
        });

        return unsubscribe;
    });

    if (!chat || !messages) {
        return createElement(
            'div',
            { className: styles.empty },
            createText('Выберите чат, чтобы отправить сообщение'),
        );
    }

    const { avatar, name, id } = (chat as Contact);

    const popupAdd = usePopup(createComponent(Popup, {
        key: 'popup',
        title: 'Добавить пользователя',
        content: createComponent(AddUserPopup, {
            key: 'addUser',
            closePopup: () => popupAdd.close(),
        }),
        close: () => popupAdd.close(),
    }));

    const popupRemove = usePopup(createComponent(Popup, {
        key: 'popup',
        title: 'Удалить пользователя',
        content: createComponent(RemoveUserPopup, {
            key: 'remove',
            id,
            name,
            closePopup: () => popupRemove.close(),
        }),
        close: () => popupRemove.close(),
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
                        key: 'addd',
                        icon: addIcon,
                        label: 'Добавить пользователя',
                        click: () => popupAdd.show(),
                    }, {
                        key: 'delete',
                        icon: deleteIcon,
                        label: 'Удалить пользователя',
                        click: () => popupRemove.show(),
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
                            name,
                        },
                    ),
                ),
                createElement(
                    'div',
                    { className: styles.name },
                    createText(name),
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
                    messages,
                },
            ),
        ),
        createElement(
            'div',
            { className: styles['new-message'] },
            createComponent(
                NewMessage,
                { key: 'new-message' },
            ),
        ),
    );
}

export {
    Chat,
};
