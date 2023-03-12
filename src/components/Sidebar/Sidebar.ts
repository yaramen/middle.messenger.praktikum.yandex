import { Button } from '../Button';
import styles from './Sidebar.css';
import hamburgerIcon from '../../icons/hamburger.svg';
import { ActionList } from '../ActionList';
import { Popover } from '../Popover';
import profileIcon from '../../icons/profile.svg';
import exitAction from '../../icons/exit.svg';
import searchIcon from '../../icons/search.svg';
import { getLinkPage } from '../../modules/router';
import { goToHistory as goTo } from '../../modules/storeRouter';
import { createComponent, createElement } from '../../modules/vdom/createElement';
import { ChatList } from '../ChatList';
import { store } from '../../modules/store';
import { TextField } from '../TextField';
import { actions } from '../../modules/actions';
import { usePopup } from '../../modules/popup';
import { Popup } from '../Popup';
import { PromptPopup } from '../PromptPopup';
import addIcon from '../../icons/add.svg';

function Sidebar() {
    const popupAddChat = usePopup(createComponent(Popup, {
        key: 'popup',
        title: 'Добавить чат',
        content: createComponent(PromptPopup, {
            key: 'addUser',
            closePopup: () => popupAddChat.close(),
            send: (name) => store.dispatch((actions.addChat(name))),
        }),
        close: () => popupAddChat.close(),
    }));

    return createElement(
        'div',
        { className: styles.sidebar },
        createElement(
            'div',
            { className: styles.header },
            createElement(
                'div',
                { className: styles.hamburger },
                createComponent(
                    Popover,
                    {
                        key: 'popover',
                        target: createComponent(
                            Button,
                            {
                                key: 'button',
                                style: 'icon',
                                icon: hamburgerIcon,
                            },
                        ),
                        content: createComponent(
                            ActionList,
                            {
                                key: 'action-list',
                                actions: [{
                                    key: 'settings',
                                    icon: profileIcon,
                                    label: 'Профиль',
                                    click: () => goTo(getLinkPage('settings')),
                                }, {
                                    key: 'settings',
                                    icon: addIcon,
                                    label: 'Добавить чат',
                                    click: () => popupAddChat.show(),
                                }, {
                                    key: 'exit',
                                    icon: exitAction,
                                    label: 'Выйти',
                                    click: () => store.dispatch(actions.logout({})),
                                }],
                            },
                        ),
                        offset: {
                            x: 38,
                            y: 10,
                        },
                    },
                ),
            ),
            createComponent(
                TextField,
                {
                    key: 'search',
                    name: 'search',
                    placeholder: 'Поиск',
                    icon: searchIcon,
                },
            ),
        ),
        createElement(
            'div',
            {},
            createComponent(
                ChatList,
                {
                    key: 'chat-list',
                },
            ),
        ),
    );
}

export {
    Sidebar,
};
