import { Button } from '../Button';
import styles from './Sidebar.css';
import hamburgerIcon from '../../icons/hamburger.svg';
import { ActionList } from '../ActionList';
import { Popover } from '../Popover';
import profileIcon from '../../icons/profile.svg';
import exitAction from '../../icons/exit.svg';
import { getLinkPage, goTo } from '../../modules/router';
import { createComponent, createElement } from '../../modules/vdom/createElement';
import { ChatList } from '../ChatList';
import { store } from '../../modules/store';

function Sidebar() {
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
                                type: 'icon',
                                icon: hamburgerIcon,
                            },
                        ),
                        content: createComponent(
                            ActionList,
                            {
                                key: 'action-list',
                                actions: [{
                                    key: 'profile',
                                    icon: profileIcon,
                                    label: 'Профиль',
                                    click: () => goTo(getLinkPage('profile')),
                                }, {
                                    key: 'exit',
                                    icon: exitAction,
                                    label: 'Выйти',
                                    click: () => goTo(getLinkPage('auth')),
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
        ),
        createElement(
            'div',
            {},
            createComponent(
                ChatList,
                {
                    key: 'chat-list',
                    contactList: store.getState().contactList,
                },
            ),
        ),
    );
}

export {
    Sidebar,
};
