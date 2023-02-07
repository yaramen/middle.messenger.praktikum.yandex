import { html } from '../../modules/html';
import { Avatar } from '../Avatar';
import { Popover } from '../Popover';
import { ActionList } from '../ActionList';
import { NewMessage } from '../NewMessage';
import { MessageList } from '../MessageList';
import { usePopup } from '../../modules/popup';
import { Popup } from '../Popup';
import { AddUserPopup } from '../AddUserPopup';
import { RemoveUserPopup } from '../RemoveUserPopup';
import styles from './Chat.css';
import addIcon from '../../icons/add.svg';
import deleteIcon from '../../icons/delete.svg';
import dotsIcon from '../../icons/dots.svg';
import { createComponent, createElement, createText } from '../../modules/vdom/createElement';
import { store } from '../../modules/store';
import { Contact } from '../../types/model';

function _Chat(chat, messages) {
    if (!messages) {
        return html`<div class="${styles.empty}">Выберите чат, чтобы отправить сообщение</div>`;
    }

    const { id, name, avatar } = chat;
    const popupAdd = usePopup(html(Popup, {
        title: 'Добавить пользователя',
        content: html(AddUserPopup, {
            closePopup: () => popupAdd.close(),
        }),
        close: () => popupAdd.close(),
    }));

    const popupRemove = usePopup(html(Popup, {
        title: 'Удалить пользователя',
        content: html(RemoveUserPopup, {
            id,
            name,
            closePopup: () => popupRemove.close(),
        }),
        close: () => popupRemove.close(),
    }));

    return html`
<div class="${styles.chat}">
    <div class="${styles.header}">
        <div class="${styles['header-content']}">
            <div class="${styles.avatar}">
                ${html(Avatar, avatar, name)}
            </div>
            <div class="${styles.name}">${name}</div>
            <div class="${styles.action}">
                ${html(Popover, {
                    target: html`<img class="${styles.dots}" src="${dotsIcon}" alt="more" />`,
                    content: html(ActionList, [{
                        icon: addIcon,
                        label: 'Добавить пользователя',
                        click: () => popupAdd.show(),
                    }, {
                        icon: deleteIcon,
                        label: 'Удалить пользователя',
                        click: () => popupRemove.show(),
                    }]),
                    offset: {
                        x: 0,
                        y: 16,
                    },
                })}
            </div>
        </div>
    </div>
    <div class="${styles.content}">
        ${html(MessageList, messages)}
    </div>
    <div class="${styles['new-message']}">
        ${html(NewMessage)}
    </div>
</div>
`;
}

function Chat() {
    const [chat, setChat] = this.useState<Contact>(null);
    const [messages, setMessages] = this.useState(null);

    this.useEffectOnce(() => {
        const unsubscribe = store.subscribe((oldState, newState) => {
            if (oldState.chatId !== newState.chatId) {
                setChat(newState.contactList.find((v) => v.id === newState.chatId));
                setMessages(newState.messages);
                console.log(newState.messages);
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

    const { avatar, name } = (chat as Contact);

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
                        click: () => console.log('popupAdd.show()'),
                    }, {
                        key: 'delete',
                        icon: deleteIcon,
                        label: 'Удалить пользователя',
                        click: () => console.log('popupRemove.show()'),
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
        ),
    );
}

export {
    Chat,
};
