import { html } from '../../modules/html';
import { TextField } from '../TextField';
import { Button } from '../Button';
import styles from './Sidebar.css';
import hamburgerIcon from '../../icons/hamburger.svg';
import searchIcon from '../../icons/search.svg';
import { ChatList } from '../ChatList';
import { ActionList } from '../ActionList';
import { Popover } from '../Popover';
import profileIcon from '../../icons/profile.svg';
import exitAction from '../../icons/exit.svg';
import { getLinkPage, goTo } from '../../modules/router';

function Sidebar(contactList) {
    return html`
<div class="${styles.sidebar}">
    <div class="${styles.header}">
        <div class="${styles.hamburger}"> 
            ${html(Popover, {
                target: html(Button, {
                    type: 'icon',
                    icon: hamburgerIcon,
                }),
                content: html(ActionList, [
                    {
                        icon: profileIcon,
                        label: 'Профиль',
                        click: () => goTo(getLinkPage('profile')),
                    },
                    {
                        icon: exitAction,
                        label: 'Выйти',
                        click: () => goTo(getLinkPage('auth')),
                    },
                ]),
                offset: {
                    x: 38,
                    y: 10,
                },
            })}
        </div>
        ${html(TextField, {
            placeholder: 'Поиск',
            icon: searchIcon,
        })}
    </div>
    <div>
        ${html(ChatList, contactList)}
    </div>
</div>
`;
}

export {
    Sidebar,
};
