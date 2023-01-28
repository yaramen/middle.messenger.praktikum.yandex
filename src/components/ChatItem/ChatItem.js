import {html} from '../../modules/html';
import {Avatar} from '../Avatar';
import {getLinkPage, goTo} from '../../modules/router';
import styles from './ChatItem.css'

function ChatItem({
    id,
    name,
    lastMessage,
    time,
    unread,
    avatar,
}) {
    function click(element, id) {
        goTo(getLinkPage('messenger', id))
    }

    return html`
<div class="${styles.item}" onclick="${click.bind(this, this, id)}">
    <div class="${styles.avatar}">
        ${html(Avatar, avatar, name)}
    </div>
    <div class="${styles.content}">
        <div class="${styles.group}">
            <div>${name}</div>
            <time class="${styles.time}">${time}</time>
        </div>
        <div class="${styles.group}">
            <div class="${styles.message}">${lastMessage}</div>
            ${unread && html`<div class="${styles.unread}">${unread}</div>`}
        </div>
    </div>
</div>
`
}

export {
    ChatItem,
}