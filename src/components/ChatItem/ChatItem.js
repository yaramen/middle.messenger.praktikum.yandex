import {html} from "../../modules/html";
import styles from "./ChatItem.css"
import {Avatar} from "../Avatar";

function ChatItem({
    name,
    lastMessage,
    time,
    unread,
    avatar,
}) {
    return html`
<div class="${styles.item}">
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