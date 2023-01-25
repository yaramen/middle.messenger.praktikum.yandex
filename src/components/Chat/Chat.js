import {html} from "../../modules/html";
import styles from './Chat.css'
import {Avatar} from "../Avatar";
import {Popover} from "../Popover";
import {ActionList} from "../ActionList/ActionList";
import addIcon from '../../icons/add.svg';
import deleteIcon from '../../icons/delete.svg';
import dotsIcon from '../../icons/dots.svg';
import {NewMessage} from "../NewMessage";
import {MessageList} from "../MessageList";

function Chat(chat) {
    if (!chat) {
        return html`
            <div class="${styles.empty}">Выберите чат, чтобы отправить сообщение</div>
        `
    }

    const {name, avatar, messages} = chat;

    return html`
<div class="${styles.chat}">
    <div class="${styles.header}">
        <div class="${styles["header-content"]}">
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
                        click: () => {}
                    }, {
                        icon: deleteIcon,
                        label: 'Удалить пользователя',
                        click: () => {}
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
    <div class="${styles["new-message"]}">
        ${html(NewMessage)}
    </div>
</div>
`
}

export {
    Chat
}