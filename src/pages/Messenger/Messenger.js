import {html} from "../../modules/html";
import {Sidebar} from "../../components/Sidebar";
import {Chat} from "../../components/Chat";
import {event, getActiveRoute} from "../../router";
import styles from "./Messenger.css";
import {store} from "../../modules/store";
import {getMessages} from "../../api/mockApi";

function Messenger() {
    const contactList = store.getState().contactList

    let activeChat = contactList.find(item => +getActiveRoute().id === item.id)
    let messages = null

    event.addEventListener('idChange', async () => {
        activeChat = contactList.find(item => +getActiveRoute().id === item.id)
        const messages = await getMessages(activeChat.id);
        const chatDom = document.querySelector('[data-ref="chat"]')
        chatDom.innerHTML = html(Chat, activeChat, messages)
    })

    return html`
<div class="${styles.container}">
    <div class="${styles.sidebar}">
        ${html(Sidebar, contactList)}
    </div>
    <div class="${styles.content}" data-ref="chat">
        ${html(Chat, activeChat, messages)}
    </div>
</div>
`
}

export {
    Messenger,
}