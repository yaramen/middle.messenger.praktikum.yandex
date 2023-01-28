import {html} from '../../modules/html';
import {Sidebar} from '../../components/Sidebar';
import {Chat} from '../../components/Chat';
import {store} from '../../modules/store';
import {getMessages} from '../../api/mockApi';
import styles from './Messenger.css';

const activeChatComputed = (state) => state.contactList.find(item => state.chatId === item.id)

store.subscribe(async (oldState, newState) => {
    if (oldState.chatId !== newState.chatId && newState.chatId) {
        const messages = await getMessages(newState.chatId);
        const chatDom = document.querySelector('[data-ref="chat"]')
        chatDom.innerHTML = html(Chat, activeChatComputed(newState), messages)
    }
})

function Messenger() {
    const contactList = store.getState().contactList
    const messages = null

    return html`
<div class="${styles.container}">
    <div class="${styles.sidebar}">
        ${html(Sidebar, contactList)}
    </div>
    <div class="${styles.content}" data-ref="chat">
        ${html(Chat, activeChatComputed(store.getState()), messages)}
    </div>
</div>
`
}

export {
    Messenger,
}