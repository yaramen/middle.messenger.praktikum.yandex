import {html} from "../../modules/html";
import {ChatItem} from "../ChatItem";

function ChatList(list) {
    return html`
<ul>
    ${list.map(chatInfo => html`
        <li>${html(ChatItem, chatInfo)}</li>
    `)}
</ul>
`
}

export {
    ChatList,
}